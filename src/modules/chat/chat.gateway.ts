import {
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ChatService } from './chat.service'
import { SendMessageDto } from './dto'
import { ValidationPipe, Logger } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'

@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server

    private readonly validate = new ValidationPipe({ transform: true, whitelist: true })
    private readonly logger = new Logger(ChatGateway.name)

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly chatService: ChatService,
    ) {}

    afterInit() {}

    async handleConnection(client: Socket) {
        try {
            const token = this.extractToken(client)
            if (!token) {
                client.emit('error', 'Unauthorized: missing token')
                return client.disconnect()
            }
            const payload = this.jwtService.verify<{ sub: number }>(token, {
                secret: this.configService.get<string>('JWT_SECRET'),
            })
            ;(client.data as any).userId = payload.sub
            client.join(this.userRoom(payload.sub))
            client.emit('connected', { userId: payload.sub })
        } catch (e) {
            this.logger.warn(`WS connect unauthorized: ${e?.message || e}`)
            client.emit('error', 'Unauthorized: invalid token')
            return client.disconnect()
        }
    }

    handleDisconnect(client: Socket) {}

    @SubscribeMessage('message:send')
    async onSendMessage(@ConnectedSocket() client: Socket, @MessageBody() body: SendMessageDto) {
        try {
            const userId = (client.data as any).userId as number | undefined
            if (!userId) throw new WsException('Unauthorized')

            const dto = (await this.validate.transform(body, {
                type: 'body',
                metatype: SendMessageDto,
            })) as SendMessageDto
            const saved = await this.chatService.createMessage(userId, dto.recipientId, dto.content)

            this.server.to(this.userRoom(saved.recipientId)).emit('message:new', saved)
            client.emit('message:sent', saved)
        } catch (e) {
            const message = e?.message || 'Failed to send message'
            this.logger.warn(`message:send failed: ${message}`)

            client.emit('error', message)
        }
    }

    private extractToken(client: Socket): string | undefined {
        const auth = client.handshake.headers['authorization']
        if (typeof auth === 'string' && auth.startsWith('Bearer ')) return auth.slice(7)
        const q = client.handshake.query?.token
        if (typeof q === 'string') return q
        return undefined
    }

    private userRoom(userId: number) {
        return `user:${userId}`
    }
}

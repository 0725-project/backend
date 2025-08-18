import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Message } from './message.entity'
import { UsersService } from '../users/users.service'
import { MessageResponseDto } from './dto'

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepo: Repository<Message>,
        private readonly usersService: UsersService,
    ) {}

    async createMessage(senderId: number, recipientId: number, content: string): Promise<MessageResponseDto> {
        const trimmed = (content ?? '').trim()
        if (!trimmed) throw new BadRequestException('Message content is required')
        if (trimmed.length > 1000) throw new BadRequestException('Message exceeds 1000 characters')

        const message = this.messageRepo.create({
            sender: { id: senderId },
            recipient: { id: recipientId },
            content: trimmed,
        })

        const saved = await this.messageRepo.save(message)
        return {
            id: saved.id,
            senderId,
            recipientId,
            content: trimmed,
            createdAt: saved.createdAt,
        }
    }

    async getRecentConversation(userId: number, peerId: number, take = 50) {
        return this.messageRepo.find({
            where: [
                { sender: { id: userId }, recipient: { id: peerId } },
                { sender: { id: peerId }, recipient: { id: userId } },
            ],
            order: { createdAt: 'DESC' },
            take,
        })
    }
}

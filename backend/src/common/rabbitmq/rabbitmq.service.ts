import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class RabbitMQService {
    constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}

    async send(pattern: string, data: any) {
        return lastValueFrom(this.client.send(pattern, data))
    }

    async emit(pattern: string, data: any) {
        return lastValueFrom(this.client.emit(pattern, data))
    }
}

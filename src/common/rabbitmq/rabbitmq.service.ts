import { Injectable, OnModuleInit } from '@nestjs/common'
import { connect as amqpConnect, ChannelWrapper } from 'amqp-connection-manager'
import { Channel } from 'amqplib'

@Injectable()
export class RabbitMQService implements OnModuleInit {
    private channel!: ChannelWrapper

    async onModuleInit() {
        const connection = amqpConnect([process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'])
        this.channel = connection.createChannel({
            json: true,
            setup: async (channel: Channel) => {
                await channel.assertExchange('posts_exchange', 'topic', { durable: true })
            },
        })
    }

    async publishPostCreated(data: unknown) {
        await this.channel.publish('posts_exchange', 'post.created', data, { persistent: true })
    }
}

import { Injectable, OnModuleInit } from '@nestjs/common'
import { connect } from 'amqplib'

@Injectable()
export class NotificationConsumer implements OnModuleInit {
    private readonly queue = 'notification_queue'

    async onModuleInit() {
        const connection = await connect(process.env.RABBITMQ_URL || 'amqp://localhost:5672')
        const channel = await connection.createChannel()
        await channel.assertQueue(this.queue, { durable: true })
        channel.consume(this.queue, (msg) => {
            if (msg) {
                const data = JSON.parse(msg.content.toString())
                console.log('Notification - Post Created:', data)

                channel.ack(msg)
            }
        })
    }
}

import { Injectable, OnModuleInit } from '@nestjs/common'
import { connect } from 'amqplib'

@Injectable()
export class SearchIndexingConsumer implements OnModuleInit {
    private readonly queue = 'searchindex_queue'

    async onModuleInit() {
        const connection = await connect(process.env.RABBITMQ_URL || 'amqp://localhost:5672')
        const channel = await connection.createChannel()
        await channel.assertQueue(this.queue, { durable: true })
        channel.consume(this.queue, (msg) => {
            if (msg) {
                const data = JSON.parse(msg.content.toString())
                console.log('Search Indexing - Post Created:', data)

                channel.ack(msg)
            }
        })
    }
}

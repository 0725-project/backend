import { Module } from '@nestjs/common'
import { RabbitMQConsumer } from './rabbitmq.consumer'

@Module({
    imports: [],
    controllers: [RabbitMQConsumer],
    providers: [],
})
export class RabbitMQConsumerModule {}

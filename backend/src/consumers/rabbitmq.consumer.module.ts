import { Module } from '@nestjs/common'
import { NotificationConsumer } from './notification.consumer'
import { SearchIndexingConsumer } from './searchindex.consumer'

@Module({
    providers: [NotificationConsumer, SearchIndexingConsumer],
})
export class RabbitMQConsumerModule {}

import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class RabbitMQConsumer {
    @MessagePattern('post_created')
    async handlePostCreated(data: { postId: number; title: string; authorId: number; topicId: number }) {
        console.log('[RabbitMQ] 게시글 생성 이벤트:', data)
        return { status: 'ok' }
    }
}

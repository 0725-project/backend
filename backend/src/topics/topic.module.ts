import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Topic } from './topic.entity'
import { Post } from '../posts/post.entity'
import { TopicsService } from './topic.service'
import { TopicsController } from './topic.controller'
import { PostsModule } from 'src/posts/posts.module'

@Module({
    imports: [TypeOrmModule.forFeature([Post, Topic]), forwardRef(() => PostsModule)],
    providers: [TopicsService],
    controllers: [TopicsController],
})
export class TopicsModule {}

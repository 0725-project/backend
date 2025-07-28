import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { Topic } from '../topics/topic.entity'
import { TopicModule } from '../topics/topic.module'

@Module({
    imports: [TypeOrmModule.forFeature([Post, Topic]), TopicModule],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}

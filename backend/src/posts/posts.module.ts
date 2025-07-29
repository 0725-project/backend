import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { Topic } from '../topics/topic.entity'
import { TopicsModule } from '../topics/topic.module'

@Module({
    imports: [TypeOrmModule.forFeature([Post, Topic]), TopicsModule],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}

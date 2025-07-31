import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './posts.entity'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { Topic } from '../topics/topics.entity'
import { TopicsModule } from '../topics/topics.module'
import { RedisModule } from 'src/common/redis/redis.module'

@Module({
    imports: [TypeOrmModule.forFeature([Post, Topic]), TopicsModule, RedisModule],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}

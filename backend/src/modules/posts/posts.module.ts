import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './posts.entity'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { TopicsModule } from 'src/modules/topics/topics.module'
import { UsersModule } from '../users/users.module'
import { RedisModule } from 'src/common/redis/redis.module'

@Module({
    imports: [TypeOrmModule.forFeature([Post]), UsersModule, TopicsModule, RedisModule],
    providers: [PostsService],
    controllers: [PostsController],
    exports: [PostsService],
})
export class PostsModule {}

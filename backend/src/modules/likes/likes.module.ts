import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Like } from './likes.entity'
import { Post } from '../posts/posts.entity'
import { User } from '../users/users.entity'
import { LikesService } from './likes.service'
import { LikesController } from './likes.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Like, Post, User])],
    providers: [LikesService],
    controllers: [LikesController],
    exports: [LikesService],
})
export class LikesModule {}

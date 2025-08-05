import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './comments.entity'
import { Post } from '../posts/posts.entity'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Post])],
    providers: [CommentsService],
    controllers: [CommentsController],
    exports: [CommentsService],
})
export class CommentsModule {}

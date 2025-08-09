import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
    selectPostBriefColumns,
    selectTopicBriefColumns,
    selectUserBriefColumns,
    USER_POINT_PER_COMMENT,
} from 'src/common/constants'
import { Comment } from './comments.entity'
import { Post } from '../posts/posts.entity'
import { User } from '../users/users.entity'

import { PaginationDto } from 'src/common/dto'
import { CreateCommentDto, GetPostCommentsDto, UpdateCommentDto } from './dto'

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepo: Repository<Comment>,
        @InjectRepository(Post)
        private readonly postRepo: Repository<Post>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async create(postId: number, createCommentDto: CreateCommentDto, userId: number) {
        const comment = this.commentRepo.create({
            content: createCommentDto.content,
            post: { id: postId },
            user: { id: userId },
        })

        const { id, content, createdAt } = await this.commentRepo.save(comment)

        await this.postRepo.increment({ id: postId }, 'commentCount', 1)

        await this.userRepo.increment({ id: userId }, 'commentCount', 1)
        await this.userRepo.increment({ id: userId }, 'points', USER_POINT_PER_COMMENT)

        return { id, content, createdAt }
    }

    async getComments(postId: number, dto: GetPostCommentsDto) {
        const query = this.commentRepo
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .select(['comment', ...selectUserBriefColumns('user')])
            .where('comment.post.id = :postId', { postId })
            .orderBy('comment.id', (dto.order ?? 'DESC').toUpperCase() as 'ASC' | 'DESC')
            .skip((dto.page! - 1) * dto.limit!)
            .take(dto.limit!)

        const [comments, total] = await query.getManyAndCount()

        return {
            comments,
            total,
            page: dto.page!,
            limit: dto.limit!,
        }
    }

    async update(id: number, dto: UpdateCommentDto, userId: number) {
        const comment = await this.commentRepo
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .select(['comment', ...selectUserBriefColumns('user')])
            .where('comment.id = :id', { id })
            .getOne()
        if (!comment) throw new NotFoundException('Comment not found')

        if (comment.user.id !== userId) {
            throw new ForbiddenException('You do not have permission to edit this comment')
        }

        Object.assign(comment, dto)
        return await this.commentRepo.save(comment)
    }

    async delete(id: number, userId: number) {
        const comment = await this.commentRepo
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .select(['comment', ...selectUserBriefColumns('user')])
            .where('comment.id = :id', { id })
            .getOne()
        if (!comment) throw new NotFoundException('Comment not found')

        if (comment.user.id !== userId) {
            throw new ForbiddenException('You do not have permission to delete this comment')
        }

        await this.commentRepo.remove(comment)

        await this.postRepo.decrement({ id: comment.post.id }, 'commentCount', 1)

        await this.userRepo.decrement({ id: userId }, 'commentCount', 1)
        await this.userRepo.decrement({ id: userId }, 'points', USER_POINT_PER_COMMENT)
    }

    async getAllComments(pdto: PaginationDto) {
        const query = this.commentRepo
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .leftJoinAndSelect('post.topic', 'postTopic')
            .leftJoinAndSelect('post.author', 'postAuthor')
            .select([
                'comment',
                ...selectUserBriefColumns('user'),
                ...selectPostBriefColumns('post'),
                ...selectTopicBriefColumns('postTopic'),
                ...selectUserBriefColumns('postAuthor'),
            ])
            .orderBy('comment.id', 'DESC')
            .skip((pdto.page! - 1) * pdto.limit!)
            .take(pdto.limit!)

        const [comments, total] = await query.getManyAndCount()

        return {
            comments,
            total,
            page: pdto.page!,
            limit: pdto.limit!,
        }
    }
}

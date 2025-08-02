import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './comments.entity'
import { selectUserColumns } from 'src/common/constants'

import { CursorPaginationDto } from 'src/common/dto'
import { CreateCommentDto, UpdateCommentDto } from './dto'

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepo: Repository<Comment>,
    ) {}

    async create(postId: number, createCommentDto: CreateCommentDto, userId: number) {
        const comment = this.commentRepo.create({
            content: createCommentDto.content,
            post: { id: postId },
            user: { id: userId },
        })

        const { id, content, createdAt } = await this.commentRepo.save(comment)
        return { id, content, createdAt }
    }

    async getComments(postId: number, dto: CursorPaginationDto) {
        const query = this.commentRepo
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .select(['comment', ...selectUserColumns('user')])
            .where('comment.postId = :postId', { postId })
            .orderBy('comment.createdAt', 'DESC')
            .take(dto.limit)

        if (dto.cursor) {
            query.andWhere('comment.id < :cursor', { cursor: dto.cursor })
        }

        const comments = await query.getMany()
        const nextCursor = comments.length < dto.limit! ? null : comments[comments.length - 1].id

        return { comments, nextCursor }
    }

    async update(id: number, dto: UpdateCommentDto, userId: number) {
        const comment = await this.commentRepo
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .select(['comment', ...selectUserColumns('user')])
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
            .select(['comment', ...selectUserColumns('user')])
            .where('comment.id = :id', { id })
            .getOne()
        if (!comment) throw new NotFoundException('Comment not found')

        if (comment.user.id !== userId) {
            throw new ForbiddenException('You do not have permission to delete this comment')
        }

        await this.commentRepo.remove(comment)
    }
}

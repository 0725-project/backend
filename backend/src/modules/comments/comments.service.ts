import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './comments.entity'
import { CreateCommentDto } from './dto/create-comment.dto'
import { CursorPaginationDto } from 'src/common/types/default.dto'
import { SELECT_USER_WITH_DEFAULT } from 'src/common/constants'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepo: Repository<Comment>,
    ) {}

    async create(createCommentDto: CreateCommentDto, userId: number) {
        const comment = this.commentRepo.create({
            content: createCommentDto.content,
            post: { id: createCommentDto.postId },
            user: { id: userId },
        })
        return await this.commentRepo.save(comment)
    }

    async getComments(postId: number, dto: CursorPaginationDto) {
        const query = this.commentRepo
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .select(['comment', ...SELECT_USER_WITH_DEFAULT])
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
            .select(['comment', ...SELECT_USER_WITH_DEFAULT])
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
            .select(['comment', ...SELECT_USER_WITH_DEFAULT])
            .where('comment.id = :id', { id })
            .getOne()
        if (!comment) throw new NotFoundException('Comment not found')

        if (comment.user.id !== userId) {
            throw new ForbiddenException('You do not have permission to delete this comment')
        }

        return this.commentRepo.remove(comment)
    }
}

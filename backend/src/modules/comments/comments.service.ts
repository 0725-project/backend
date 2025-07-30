import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './comment.entity'
import { CreateCommentDto } from './dto/create-comment.dto'
import { CursorPaginationDto } from 'src/common/types/default.dto'

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepo: Repository<Comment>,
    ) {}

    async create(createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
        const comment = this.commentRepo.create({
            content: createCommentDto.content,
            post: { id: createCommentDto.postId },
            user: { id: userId },
        })
        return await this.commentRepo.save(comment)
    }

    async getComments(postId: number, dto: CursorPaginationDto): Promise<Comment[]> {
        const query = this.commentRepo
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .where('comment.postId = :postId', { postId })
            .orderBy('comment.createdAt', 'DESC')
            .take(dto.limit || 10)

        if (dto.cursor) {
            query.andWhere('comment.id < :cursor', { cursor: dto.cursor })
        }

        return await query.getMany()
    }
}

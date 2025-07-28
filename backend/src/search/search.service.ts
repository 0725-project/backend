import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Post } from '../posts/post.entity'

@Injectable()
export class SearchService {
    constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

    async search(
        keyword?: string,
        author?: string,
        cursor?: number,
        limit = 10,
        order: 'asc' | 'desc' = 'desc',
        startDate?: string,
        endDate?: string,
    ) {
        if (limit < 1 || limit > 20) throw new BadRequestException('Limit must be between 1 and 20')
        if (order !== 'asc' && order !== 'desc') {
            throw new BadRequestException('Order must be "asc" or "desc"')
        }

        const query = this.repo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .orderBy('post.id', order.toUpperCase() as 'ASC' | 'DESC')
            .take(limit)

        const where: string[] = []
        const params: Record<string, any> = {}

        if (keyword) {
            where.push('(post.title ILIKE :q OR post.content ILIKE :q)')
            params.q = `%${keyword}%`
        }

        if (author) {
            where.push('author.username ILIKE :author')
            params.author = `%${author}%`
        }

        if (cursor) {
            where.push(`post.id ${order === 'desc' ? '<' : '>'} :cursor`)
            params.cursor = cursor
        }

        if (startDate) {
            where.push('post.createdAt >= :startDate')
            params.startDate = new Date(startDate)
        }

        if (endDate) {
            const endDateObj = new Date(endDate)
            endDateObj.setSeconds(endDateObj.getSeconds() + 1)
            where.push('post.createdAt <= :endDate')
            params.endDate = endDateObj
        }

        if (where.length > 0) {
            query.where(where.join(' AND '), params)
            console.log('Search query:', query.getQueryAndParameters())
        }

        const posts = await query.getMany()
        const nextCursor = posts.length < limit ? null : posts[posts.length - 1].id

        return { posts, nextCursor }
    }
}

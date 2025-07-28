import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Post } from '../posts/post.entity'
import { SearchPostsQueryDto } from './dto/search-posts.dto'

@Injectable()
export class SearchService {
    constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

    async search(dto: SearchPostsQueryDto) {
        const query = this.repo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .orderBy('post.id', dto.order!.toUpperCase() as 'ASC' | 'DESC')
            .take(dto.limit!)

        const where: string[] = []
        const params: Record<string, any> = {}

        if (dto.q) {
            where.push('(post.title ILIKE :q OR post.content ILIKE :q)')
            params.q = `%${dto.q}%`
        }

        if (dto.author) {
            where.push('author.username ILIKE :author')
            params.author = `%${dto.author}%`
        }

        if (dto.topicName) {
            where.push('topic.name ILIKE :topicName')
            params.topicName = `%${dto.topicName}%`
        }

        if (dto.cursor) {
            where.push(`post.id ${dto.order === 'desc' ? '<' : '>'} :cursor`)
            params.cursor = dto.cursor
        }

        if (dto.startDate) {
            where.push('post.createdAt >= :startDate')
            params.startDate = new Date(dto.startDate)
        }

        if (dto.endDate) {
            const endDateObj = new Date(dto.endDate)
            endDateObj.setSeconds(endDateObj.getSeconds() + 1)
            where.push('post.createdAt <= :endDate')
            params.endDate = endDateObj
        }

        if (where.length > 0) {
            query.where(where.join(' AND '), params)
        }

        const posts = await query.getMany()
        const nextCursor = posts.length < dto.limit! ? null : posts[posts.length - 1].id

        return { posts, nextCursor }
    }
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Post } from '../posts/posts.entity'
import { selectTopicColumns, selectUserColumns } from 'src/common/constants'
import { SearchPostsQueryDto } from './search.dto'

@Injectable()
export class SearchService {
    constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

    async search(dto: SearchPostsQueryDto) {
        const query = this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .select(['post', ...selectUserColumns('author'), ...selectTopicColumns('topic')])
            .orderBy('post.id', dto.order!.toUpperCase() as 'ASC' | 'DESC')
            .take(dto.limit!)

        if (dto.q) {
            query.andWhere('(post.title ILIKE :q OR post.content ILIKE :q)', { q: `%${dto.q}%` })
        }

        if (dto.author) {
            query.andWhere('author.username ILIKE :author', { author: `%${dto.author}%` })
        }

        if (dto.topicName) {
            query.andWhere('topic.name ILIKE :topicName', { topicName: `%${dto.topicName}%` })
        }

        if (dto.cursor) {
            query.andWhere(`post.id ${dto.order === 'desc' ? '<' : '>'} :cursor`, { cursor: dto.cursor })
        }

        if (dto.startDate) {
            query.andWhere('post.createdAt >= :startDate', { startDate: new Date(dto.startDate) })
        }

        if (dto.endDate) {
            const endDateObj = new Date(dto.endDate)
            endDateObj.setSeconds(endDateObj.getSeconds() + 1)
            query.andWhere('post.createdAt <= :endDate', { endDate: endDateObj })
        }

        const posts = await query.getMany()
        const nextCursor = posts.length < dto.limit! ? null : posts[posts.length - 1].id

        return { posts, nextCursor }
    }
}

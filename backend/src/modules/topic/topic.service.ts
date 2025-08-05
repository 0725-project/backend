import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { selectTopicBriefColumns, selectUserBriefColumns } from 'src/common/constants'
import { Post } from 'src/modules/posts/posts.entity'
import { Topic } from 'src/modules/topics/topics.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepo: Repository<Post>,
        @InjectRepository(Topic)
        private readonly topicRepo: Repository<Topic>,
    ) {}

    async postsFindByTopicName(topicName: string, cursor?: number, limit = 10) {
        const topic = await this.topicRepo.findOne({ where: { name: topicName } })
        if (!topic) throw new NotFoundException('Topic not found')

        const query = this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .select(['post', ...selectUserBriefColumns('author')])
            .where('topic.id = :topicId', { topicId: topic.id })
            .orderBy('post.id', 'DESC')
            .take(limit)

        if (cursor) {
            query.andWhere('post.id < :cursor', { cursor })
        }

        const posts = await query.getMany()
        const nextCursor = posts.length < limit ? null : posts[posts.length - 1].id

        return { posts, nextCursor }
    }

    async postFindByTopicLocalId(topicName: string, topicLocalId: number) {
        const topic = await this.topicRepo.findOne({ where: { name: topicName } })
        if (!topic) throw new NotFoundException('Topic not found')

        const post = await this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .select(['post', ...selectUserBriefColumns('author'), ...selectTopicBriefColumns('topic')])
            .where('post.topic.id = :topicId', { topicId: topic.id })
            .andWhere('post.topicLocalId = :topicLocalId', { topicLocalId })
            .getOne()
        if (!post) throw new NotFoundException('Post not found')

        return post
    }
}

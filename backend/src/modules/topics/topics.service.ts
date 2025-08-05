import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Topic } from './topics.entity'

import { CreateTopicDto } from './dto'
import { selectUserBriefColumns } from 'src/common/constants'

@Injectable()
export class TopicsService {
    constructor(
        @InjectRepository(Topic)
        private readonly topicRepo: Repository<Topic>,
    ) {}

    async create(createTopicDto: CreateTopicDto, creatorId: number) {
        const topic = this.topicRepo.create({
            ...createTopicDto,
            slug: createTopicDto.topicSlug,
            name: createTopicDto.topicName,
            description: createTopicDto.description,
            creator: { id: creatorId },
        })

        const { id, slug, name, description, createdAt } = await this.topicRepo.save(topic)
        return {
            id,
            slug,
            name,
            description,
            createdAt,
        }
    }

    async findBySlug(slug: string) {
        const topic = await this.topicRepo
            .createQueryBuilder('topic')
            .leftJoinAndSelect('topic.creator', 'creator')
            .select(['topic', ...selectUserBriefColumns('creator')])
            .where('topic.slug = :slug', { slug })
            .getOne()
        if (!topic) throw new NotFoundException('Topic not found')

        return topic
    }

    async findAll(cursor?: number, limit = 10) {
        const query = this.topicRepo
            .createQueryBuilder('topic')
            .leftJoinAndSelect('topic.creator', 'creator')
            .select(['topic', ...selectUserBriefColumns('creator')])
            .orderBy('topic.id', 'DESC')
            .take(limit)

        if (cursor) {
            query.andWhere('topic.id < :cursor', { cursor })
        }

        const topics = await query.getMany()
        const nextCursor = topics.length < limit ? null : topics[topics.length - 1].id

        return { topics, nextCursor }
    }
}

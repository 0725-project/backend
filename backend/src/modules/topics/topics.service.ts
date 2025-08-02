import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Topic } from './topics.entity'

import { CreateTopicDto } from './dto'

@Injectable()
export class TopicsService {
    constructor(
        @InjectRepository(Topic)
        private readonly topicRepo: Repository<Topic>,
    ) {}

    async create(createTopicDto: CreateTopicDto, creatorId: number) {
        const topic = this.topicRepo.create({
            ...createTopicDto,
            name: createTopicDto.topicName,
            creator: { id: creatorId },
        })

        const { id, name, description, createdAt } = await this.topicRepo.save(topic)
        return {
            id,
            name,
            description,
            createdAt,
        }
    }

    async findByName(name: string) {
        const topic = await this.topicRepo
            .createQueryBuilder('topic')
            .leftJoinAndSelect('topic.creator', 'creator')
            .select(['topic', 'creator.id', 'creator.username', 'creator.nickname'])
            .where('topic.name = :name', { name })
            .getOne()
        if (!topic) throw new NotFoundException('Topic not found')

        return topic
    }

    async findAll(cursor?: number, limit = 10) {
        const query = this.topicRepo
            .createQueryBuilder('topic')
            .leftJoinAndSelect('topic.creator', 'creator')
            .select(['topic', 'creator.id', 'creator.username', 'creator.nickname'])
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

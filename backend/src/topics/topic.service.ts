import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Topic } from './topic.entity'
import { CreateTopicDto } from './dto/create-topic.dto'
import { User } from '../users/user.entity'
import { Post } from '../posts/post.entity'

@Injectable()
export class TopicsService {
    constructor(
        @InjectRepository(Topic)
        private readonly topicRepo: Repository<Topic>,
    ) {}

    async create(createTopicDto: CreateTopicDto, creatorId: number) {
        const exists = await this.topicRepo.findOne({ where: { name: createTopicDto.topicName } })
        if (exists) throw new ConflictException('Topic already exists')

        const topic = this.topicRepo.create({
            ...createTopicDto,
            name: createTopicDto.topicName,
            creator: { id: creatorId },
        })
        return this.topicRepo.save(topic)
    }

    async findByName(name: string) {
        const topic = await this.topicRepo.findOne({ where: { name }, relations: ['creator'] })
        if (!topic) throw new NotFoundException('Topic not found')

        console.log('Topic found:', topic)

        return topic
    }

    async findAll() {
        return this.topicRepo.find({ relations: ['creator'] })
    }
}

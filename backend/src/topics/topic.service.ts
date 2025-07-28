import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Topic } from './topic.entity'
import { CreateTopicDto } from './dto/create-topic.dto'
import { User } from '../users/user.entity'

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(Topic)
        private readonly topicRepository: Repository<Topic>,
    ) {}

    async create(createTopicDto: CreateTopicDto, creatorId: number) {
        const exists = await this.topicRepository.findOne({ where: { name: createTopicDto.topicName } })
        if (exists) throw new ConflictException('Topic already exists')

        const topic = this.topicRepository.create({
            ...createTopicDto,
            name: createTopicDto.topicName,
            creator: { id: creatorId },
        })
        return this.topicRepository.save(topic)
    }

    async findByName(name: string) {
        const topic = await this.topicRepository.findOne({ where: { name }, relations: ['creator'] })
        if (!topic) throw new NotFoundException('Topic not found')

        return topic
    }

    async findAll() {
        return this.topicRepository.find({ relations: ['creator'] })
    }
}

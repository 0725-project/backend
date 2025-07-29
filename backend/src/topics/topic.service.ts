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
        private readonly topicRepository: Repository<Topic>,
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}
    async findPostByTopicLocalId(topicName: string, topicLocalId: number) {
        const topic = await this.topicRepository.findOne({ where: { name: topicName } })
        if (!topic) throw new NotFoundException('Topic not found')

        const post = await this.postRepository.findOne({
            where: { topic: { id: topic.id }, topicLocalId },
            relations: ['author', 'topic'],
        })
        if (!post) throw new NotFoundException('Post not found')

        return post
    }

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

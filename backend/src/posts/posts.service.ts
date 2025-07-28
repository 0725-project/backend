import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { Repository } from 'typeorm'
import { UpdatePostDto } from './dto/update-post.dto'
import { CreatePostDto } from './dto/create-post.dto'
import { Topic } from '../topics/topic.entity'

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private repo: Repository<Post>,
        @InjectRepository(Topic) private topicRepo: Repository<Topic>,
    ) {}

    async create(createPostDto: CreatePostDto, userId: number) {
        const topic = await this.topicRepo.findOne({ where: { name: createPostDto.topicName } })
        if (!topic) throw new NotFoundException('Topic not found')

        const post = this.repo.create({ ...createPostDto, author: { id: userId }, topic })
        return this.repo.save(post)
    }

    async findAll(cursor?: number, limit = 10) {
        const query = this.repo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .orderBy('post.id', 'DESC')
            .take(limit)

        if (cursor) {
            query.andWhere('post.id < :cursor', { cursor })
        }

        const posts = await query.getMany()
        const nextCursor = posts.length < limit ? null : posts[posts.length - 1].id

        return { posts, nextCursor }
    }

    async findOne(id: number) {
        const post = await this.repo.findOne({ where: { id }, relations: ['author', 'topic'] })
        if (!post) {
            throw new NotFoundException('Post not found')
        }

        return post
    }

    async findByTopicName(topicName: string, cursor?: number, limit = 10) {
        const topic = await this.topicRepo.findOne({ where: { name: topicName } })
        if (!topic) throw new NotFoundException('Topic not found')

        const query = this.repo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .where('topic.name = :topicName', { topicName })
            .orderBy('post.id', 'DESC')
            .take(limit)

        if (cursor) {
            query.andWhere('post.id < :cursor', { cursor })
        }

        const posts = await query.getMany()
        const nextCursor = posts.length < limit ? null : posts[posts.length - 1].id

        return { posts, nextCursor }
    }

    async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
        const post = await this.repo.findOne({ where: { id }, relations: ['author'] })
        if (!post) {
            throw new NotFoundException('Post not found')
        }

        if (post.author.id !== userId) {
            throw new ForbiddenException('You are not the author of this post')
        }

        Object.assign(post, updatePostDto)
        return this.repo.save(post)
    }

    async remove(id: number, userId: number) {
        const post = await this.repo.findOne({ where: { id }, relations: ['author'] })
        if (!post) {
            throw new NotFoundException('Post not found')
        }

        if (post.author.id !== userId) {
            throw new ForbiddenException('You are not authorized to delete this post')
        }

        return this.repo.remove(post)
    }
}

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './posts.entity'
import { Topic } from 'src/modules/topics/topics.entity'
import { User } from '../users/users.entity'
import { Repository } from 'typeorm'
import { RedisService } from 'src/common/redis/redis.service'
import { selectUserBriefColumns, selectTopicBriefColumns } from 'src/common/constants'

import { CreatePostDto, UpdatePostDto } from './dto'
import { PaginationDto } from 'src/common/dto'

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postRepo: Repository<Post>,
        @InjectRepository(Topic) private topicRepo: Repository<Topic>,
        @InjectRepository(User) private userRepo: Repository<User>,
        private redisService: RedisService,
    ) {}

    async create(createPostDto: CreatePostDto, userId: number, ip: string) {
        const topic = await this.topicRepo.findOne({ where: { slug: createPostDto.topicSlug } })
        if (!topic) throw new NotFoundException('Topic not found')

        const count = await this.postRepo.count({ where: { topic: { id: topic.id } } })

        const post = this.postRepo.create({
            ...createPostDto,
            author: { id: userId },
            topic,
            topicLocalId: count + 1,
            viewCount: 0,
            commentCount: 0,
            ip,
        })

        const { id, title, content, createdAt, topicLocalId, viewCount, commentCount } = await this.postRepo.save(post)
        return {
            id,
            title,
            content,
            createdAt,
            topicLocalId,
            viewCount,
            commentCount,
        }
    }

    async findAll(pdto: PaginationDto) {
        const query = this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .select(['post', ...selectUserBriefColumns('author'), ...selectTopicBriefColumns('topic')])
            .orderBy('post.id', 'DESC')
            .skip((pdto.page! - 1) * pdto.limit!)
            .take(pdto.limit!)

        const [posts, total] = await query.getManyAndCount()

        return {
            posts,
            total,
            page: pdto.page!,
            limit: pdto.limit!,
        }
    }

    async findOne(id: number) {
        const post = await this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .select(['post', ...selectUserBriefColumns('author'), ...selectTopicBriefColumns('topic')])
            .where('post.id = :id', { id })
            .getOne()
        if (!post) {
            throw new NotFoundException('Post not found')
        }

        return post
    }

    async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
        const post = await this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .select(['post', ...selectUserBriefColumns('author'), ...selectTopicBriefColumns('topic')])
            .where('post.id = :id', { id })
            .getOne()
        if (!post) {
            throw new NotFoundException('Post not found')
        }

        if (post.author.id !== userId) {
            throw new ForbiddenException('You are not the author of this post')
        }

        Object.assign(post, updatePostDto)
        return this.postRepo.save(post)
    }

    async delete(id: number, userId: number) {
        const post = await this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .select(['post', ...selectUserBriefColumns('author'), ...selectTopicBriefColumns('topic')])
            .where('post.id = :id', { id })
            .getOne()
        if (!post) {
            throw new NotFoundException('Post not found')
        }

        if (post.author.id !== userId) {
            throw new ForbiddenException('You are not authorized to delete this post')
        }

        await this.postRepo.remove(post)
    }

    async incrementViewCount(postId: number, ip: string) {
        const key = `post:${postId}:viewer:${ip}`
        const exists = await this.redisService.get(key)
        if (!exists) {
            await this.redisService.set(key, '1', 5) // 1 hour TTL TODO
            await this.postRepo.increment({ id: postId }, 'viewCount', 1)
        }
    }
}

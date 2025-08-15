import { Injectable, NotFoundException, ForbiddenException, Inject, forwardRef } from '@nestjs/common'
import { ElasticsearchService } from 'src/common/elasticsearch/elasticsearch.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './posts.entity'
import { Repository } from 'typeorm'
import { RedisService } from 'src/common/redis/redis.service'
import { selectUserBriefColumns, selectTopicBriefColumns, USER_POINT_PER_POST } from 'src/common/constants'
import { RabbitMQService } from 'src/common/rabbitmq/rabbitmq.service'

import { CreatePostDto, GetPostsQueryDto, PostResponseDto, PostsResponseDto, UpdatePostDto } from './dto'
import { UsersService } from '../users/users.service'
import { TopicsService } from '../topics/topics.service'
import { PostDocument } from 'src/common/elasticsearch/elasticsearch.schema'

@Injectable()
export class PostsService {
    private readonly ES_INDEX = 'posts'

    constructor(
        @InjectRepository(Post) private postRepo: Repository<Post>,
        private usersService: UsersService,
        private topicsService: TopicsService,
        private redisService: RedisService,
        private rabbitMQService: RabbitMQService,
        private elasticsearchService: ElasticsearchService,
    ) {}

    async create(createPostDto: CreatePostDto, userId: number): Promise<PostResponseDto> {
        const topic = await this.topicsService.findBySlug(createPostDto.topicSlug)
        const author = await this.usersService.findById(userId)

        const count = await this.postRepo.count({ where: { topic: { id: topic.id } } })

        const post = this.postRepo.create({
            ...createPostDto,
            author: { id: userId },
            topic,
            topicLocalId: count + 1,
            viewCount: 0,
            commentCount: 0,
            likeCount: 0,
        })

        await this.topicsService.increment(topic.id, 'postCount', 1)
        await this.usersService.increment(userId, 'postCount', 1)
        await this.usersService.increment(userId, 'points', USER_POINT_PER_POST)

        const saved = await this.postRepo.save(post)

        await this.elasticsearchService.indexDocument<PostDocument>(this.ES_INDEX, saved.id.toString(), {
            id: saved.id,
            title: saved.title,
            content: saved.content,
            author: {
                id: author.id,
                username: author.username,
                nickname: author.nickname,
            },
            topic: {
                id: topic.id,
                slug: topic.slug,
                name: topic.name,
            },
            createdAt: saved.createdAt,
        })

        this.rabbitMQService.publishPostCreated({
            ...saved,
            author,
            topic,
        })

        return { ...saved, author, topic }
    }

    async findAll(dto: GetPostsQueryDto): Promise<PostsResponseDto> {
        const page = dto.page ?? 1
        const limit = dto.limit ?? 10
        const from = (page - 1) * limit

        let esQuery: any = { query: { match_all: {} } }
        if (dto.q) {
            esQuery = {
                query: {
                    multi_match: {
                        query: dto.q,
                        fields: ['title', 'content'],
                    },
                },
            }
        }

        const result = await this.elasticsearchService.search(this.ES_INDEX, esQuery, from, limit)
        const ids: number[] = result.hits.hits.map((hit: any) => Number(hit._source.id))

        const posts: PostResponseDto[] = []
        for (const id of ids) posts.push(await this.findOne(id))

        const total = result.hits.total
            ? typeof result.hits.total === 'number'
                ? result.hits.total
                : result.hits.total.value
            : 0

        return {
            posts,
            total,
            page,
            limit,
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
        const updated = await this.postRepo.save(post)

        await this.elasticsearchService.updateDocument<PostDocument>(this.ES_INDEX, id.toString(), {
            id: updated.id,
            title: updated.title,
            content: updated.content,
            author: updated.author,
            topic: updated.topic,
            createdAt: updated.createdAt,
        })

        return updated
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

        await this.elasticsearchService.deleteDocument(this.ES_INDEX, id.toString())

        await this.topicsService.decrement(post.topic.id, 'postCount', 1)
        await this.usersService.decrement(userId, 'postCount', 1)
        await this.usersService.decrement(userId, 'points', USER_POINT_PER_POST)
    }

    async incrementViewCount(postId: number, ip: string) {
        const key = `post:${postId}:viewer:${ip}`
        const exists = await this.redisService.get(key)
        if (!exists) {
            await this.redisService.set(key, '1', 5) // 1 hour TTL TODO
            await this.postRepo.increment({ id: postId }, 'viewCount', 1)
        }
    }

    async increment(postId: number, column: string, value: number) {
        await this.postRepo.increment({ id: postId }, column, value)
    }

    async decrement(postId: number, column: string, value: number) {
        await this.postRepo.decrement({ id: postId }, column, value)
    }
}

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { Repository } from 'typeorm'
import { UpdatePostDto } from './dto/update-post.dto'
import { CreatePostDto } from './dto/create-post.dto'
import { Topic } from '../topics/topics.entity'
import { SELECT_POSTS_WITH_AUTHOR_AND_TOPIC } from 'src/common/constants'

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postRepo: Repository<Post>,
        @InjectRepository(Topic) private topicRepo: Repository<Topic>,
    ) {}

    async create(createPostDto: CreatePostDto, userId: number) {
        const topic = await this.topicRepo.findOne({ where: { name: createPostDto.topicName } })
        if (!topic) throw new NotFoundException('Topic not found')

        const count = await this.postRepo.count({ where: { topic: { id: topic.id } } })

        const post = this.postRepo.create({
            ...createPostDto,
            author: { id: userId },
            topic,
            topicLocalId: count + 1,
        })
        return this.postRepo.save(post)
    }

    async findAll(cursor?: number, limit = 10) {
        const query = this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .select(SELECT_POSTS_WITH_AUTHOR_AND_TOPIC)
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
        const post = await this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .select(SELECT_POSTS_WITH_AUTHOR_AND_TOPIC)
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
            .select(SELECT_POSTS_WITH_AUTHOR_AND_TOPIC)
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

    async remove(id: number, userId: number) {
        const post = await this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.topic', 'topic')
            .select(SELECT_POSTS_WITH_AUTHOR_AND_TOPIC)
            .where('post.id = :id', { id })
            .getOne()
        if (!post) {
            throw new NotFoundException('Post not found')
        }

        if (post.author.id !== userId) {
            throw new ForbiddenException('You are not authorized to delete this post')
        }

        return this.postRepo.remove(post)
    }
}

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { Repository } from 'typeorm'
import { UpdatePostDto } from './dto/update-post.dto'
import { CreatePostDto } from './dto/create-post.dto'

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

    async create(createPostDto: CreatePostDto, userId: number) {
        const post = this.repo.create({ ...createPostDto, author: { id: userId } })
        return this.repo.save(post)
    }

    async findAll(cursor?: number, limit = 10) {
        const query = this.repo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .orderBy('post.id', 'DESC')
            .take(limit)

        if (cursor) {
            query.where('post.id < :cursor', { cursor })
        }

        const posts = await query.getMany()
        const nextCursor = posts.length < limit ? null : posts[posts.length - 1].id

        return { posts, nextCursor }
    }

    async findOne(id: number) {
        const post = await this.repo.findOne({ where: { id }, relations: ['author'] })
        if (!post) {
            throw new NotFoundException('Post not found')
        }

        return post
    }

    async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
        const post = await this.repo.findOne({ where: { id }, relations: ['author'] })
        if (!post) {
            throw new NotFoundException('Post not found')
        }

        if (post.author.id !== userId) {
            throw new ForbiddenException('You are not authorized to update this post')
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

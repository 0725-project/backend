import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { Repository } from 'typeorm'
import { UpdatePostDto } from './dto/update-post.dto'
import { CreatePostDto } from './dto/create-post.dto'

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

    create(createPostDto: CreatePostDto, userId: number) {
        const post = this.repo.create({ ...createPostDto, author: { id: userId } })
        return this.repo.save(post)
    }

    findAll() {
        return this.repo.find({ relations: ['author'] })
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id }, relations: ['author'] })
    }

    async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
        const post = await this.repo.findOne({ where: { id }, relations: ['author'] })
        if (!post) {
            throw new NotFoundException('Post not found')
        }
        if (post.author.id !== userId) {
            throw new NotFoundException('You are not authorized to update this post')
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
            throw new NotFoundException('You are not authorized to delete this post')
        }
        return this.repo.remove(post)
    }
}

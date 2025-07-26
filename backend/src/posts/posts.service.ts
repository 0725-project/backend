import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { Repository } from 'typeorm'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

    create(title: string, content: string, userId: number) {
        const post = this.repo.create({ title, content, author: { id: userId } })
        return this.repo.save(post)
    }

    findAll() {
        return this.repo.find({ relations: ['author'] })
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id }, relations: ['author'] })
    }

    async update(id: number, updatePostDto: UpdatePostDto) {
        const post = await this.repo.findOne({ where: { id } })
        if (!post) {
            throw new NotFoundException('Post not found')
        }
        Object.assign(post, updatePostDto)
        return this.repo.save(post)
    }

    async remove(id: number) {
        const post = await this.repo.findOne({ where: { id } })
        if (!post) {
            throw new NotFoundException('Post not found')
        }
        return this.repo.remove(post)
    }
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

    create(title: string, content: string, userId: number) {
        return this.repo.save({ title, content, author: { id: userId } })
    }

    findAll() {
        return this.repo.find({ relations: ['author'] })
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id }, relations: ['author'] })
    }

    async update(id: number, title: string, content: string) {
        const post = await this.repo.findOne({ where: { id } })
        if (!post) throw new NotFoundException()
        post.title = title
        post.content = content
        return this.repo.save(post)
    }

    async remove(id: number) {
        const post = await this.repo.findOne({ where: { id } })
        if (!post) throw new NotFoundException()
        return this.repo.remove(post)
    }
}

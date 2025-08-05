import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Like } from './likes.entity'
import { Post } from '../posts/posts.entity'
import { User } from '../users/users.entity'
import { selectUserBriefColumns } from 'src/common/constants'

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Like) private likeRepo: Repository<Like>,
        @InjectRepository(Post) private postRepo: Repository<Post>,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}

    async likePost(postId: number, userId: number) {
        const post = await this.postRepo.findOne({ where: { id: postId } })
        if (!post) {
            throw new NotFoundException('Post not found')
        }

        const user = await this.userRepo.findOne({ where: { id: userId } })
        if (!user) {
            throw new NotFoundException('User not found')
        }

        const like = this.likeRepo.create({ post, user })
        await this.likeRepo.save(like)

        await this.postRepo.increment({ id: postId }, 'likeCount', 1)
    }

    async unlikePost(postId: number, userId: number) {
        const like = await this.likeRepo.findOne({ where: { post: { id: postId }, user: { id: userId } } })
        if (!like) {
            throw new NotFoundException('Like not found')
        }

        await this.likeRepo.remove(like)
        await this.postRepo.decrement({ id: postId }, 'likeCount', 1)
    }

    async getLikesForPost(postId: number, cursor?: number, limit = 10) {
        const post = await this.postRepo.findOne({ where: { id: postId } })
        if (!post) {
            throw new NotFoundException('Post not found')
        }

        const query = this.likeRepo
            .createQueryBuilder('like')
            .leftJoinAndSelect('like.user', 'user')
            .where('like.post.id = :postId', { postId })
            .select(['like', ...selectUserBriefColumns('user')])
            .orderBy('like.createdAt', 'DESC')
            .take(limit)

        if (cursor) {
            query.andWhere('like.id < :cursor', { cursor })
        }

        const likes = await query.getMany()
        const nextCursor = likes.length ? likes[likes.length - 1].id : null

        return {
            likes,
            nextCursor,
        }
    }
}

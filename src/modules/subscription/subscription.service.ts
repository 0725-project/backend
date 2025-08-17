import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Subscription } from './subscription.entity'
import { UsersService } from '../users/users.service'
import { IdDto, PaginationDto } from 'src/common/dto'
import { selectUserBriefColumns } from 'src/common/constants'
import { FollowerListResponseDto, FollowingListResponseDto } from './dto'

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(Subscription) private readonly subscriptionRepo: Repository<Subscription>,
        private readonly usersService: UsersService,
    ) {}

    async follow(followerId: number, followingId: number) {
        if (followerId === followingId) {
            throw new ConflictException('Cannot follow yourself.')
        }

        const follower = await this.usersService.findById(followerId)
        const following = await this.usersService.findById(followingId)

        const subscription = this.subscriptionRepo.create({ follower, following })
        await this.subscriptionRepo.save(subscription)

        await this.usersService.increment(followerId, 'followingCount', 1)
        await this.usersService.increment(followingId, 'followersCount', 1)
    }

    async unfollow(followerId: number, followingId: number) {
        const follower = await this.usersService.findById(followerId)
        const following = await this.usersService.findById(followingId)

        const subscription = await this.subscriptionRepo.findOne({ where: { follower, following } })
        if (!subscription) {
            throw new NotFoundException('Subscription not found.')
        }

        await this.subscriptionRepo.remove(subscription)

        await this.usersService.decrement(followerId, 'followingCount', 1)
        await this.usersService.decrement(followingId, 'followersCount', 1)
    }

    async getFollowers(userId: number, pdto: PaginationDto): Promise<FollowerListResponseDto> {
        const query = this.subscriptionRepo
            .createQueryBuilder('subscription')
            .leftJoinAndSelect('subscription.follower', 'follower')
            .select(['subscription', ...selectUserBriefColumns('follower')])
            .where('subscription.following.id = :userId', { userId })
            .orderBy('subscription.id', 'DESC')
            .skip((pdto.page! - 1) * pdto.limit!)
            .take(pdto.limit!)

        const [followers, total] = await query.getManyAndCount()

        return {
            followers,
            total,
            page: pdto.page!,
            limit: pdto.limit!,
        }
    }

    async getFollowing(userId: number, pdto: PaginationDto): Promise<FollowingListResponseDto> {
        const query = this.subscriptionRepo
            .createQueryBuilder('subscription')
            .leftJoinAndSelect('subscription.following', 'following')
            .select(['subscription', ...selectUserBriefColumns('following')])
            .where('subscription.follower.id = :userId', { userId })
            .orderBy('subscription.id', 'DESC')
            .skip((pdto.page! - 1) * pdto.limit!)
            .take(pdto.limit!)

        const [following, total] = await query.getManyAndCount()

        return {
            following,
            total,
            page: pdto.page!,
            limit: pdto.limit!,
        }
    }
}

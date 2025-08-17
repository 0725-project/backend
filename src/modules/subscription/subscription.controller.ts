import { Controller, Post, Delete, Get, Param, Request, UseGuards, Query } from '@nestjs/common'
import { SubscriptionService } from './subscription.service'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
    ApiConflictResponse,
} from '@nestjs/swagger'
import { AuthenticatedRequest } from 'src/common/types/express-request.interface'
import { IdDto, PaginationDto } from 'src/common/dto'
import { FollowerListResponseDto, FollowingListResponseDto } from './dto'

@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post(':userId')
    @ApiOperation({ summary: 'Follow a user' })
    @ApiResponse({ status: 201, description: 'Followed successfully.', type: IdDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiNotFoundResponse({ description: 'User not found.' })
    @ApiConflictResponse({ description: 'Already following.' })
    @ApiBadRequestResponse({ description: 'Invalid user ID.' })
    async follow(@Param('userId') userId: number, @Request() req: AuthenticatedRequest) {
        return this.subscriptionService.follow(req.user.userId, userId)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':userId')
    @ApiOperation({ summary: 'Unfollow a user' })
    @ApiResponse({ status: 200, description: 'Unfollowed successfully.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiNotFoundResponse({ description: 'Subscription not found.' })
    @ApiBadRequestResponse({ description: 'Invalid user ID.' })
    async unfollow(@Param('userId') userId: number, @Request() req: AuthenticatedRequest) {
        return this.subscriptionService.unfollow(req.user.userId, userId)
    }

    @Get('followers/:userId')
    @ApiOperation({ summary: 'Get followers of a user' })
    @ApiResponse({ status: 200, description: 'Return followers list.', type: FollowerListResponseDto })
    @ApiNotFoundResponse({ description: 'User not found.' })
    @ApiBadRequestResponse({ description: 'Invalid user ID.' })
    async getFollowers(
        @Param('userId') userId: number,
        @Query() query: PaginationDto,
    ): Promise<FollowerListResponseDto> {
        return this.subscriptionService.getFollowers(userId, query)
    }

    @Get('following/:userId')
    @ApiOperation({ summary: 'Get following list of a user' })
    @ApiResponse({ status: 200, description: 'Return following list.', type: FollowingListResponseDto })
    @ApiNotFoundResponse({ description: 'User not found.' })
    @ApiBadRequestResponse({ description: 'Invalid user ID.' })
    async getFollowing(
        @Param('userId') userId: number,
        @Query() query: PaginationDto,
    ): Promise<FollowingListResponseDto> {
        return this.subscriptionService.getFollowing(userId, query)
    }
}

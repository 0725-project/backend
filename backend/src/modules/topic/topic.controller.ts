import { Controller, Get, Param, Query } from '@nestjs/common'
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiQuery,
    ApiParam,
} from '@nestjs/swagger'
import { TopicService } from './topic.service'

import { CursorPaginationDto } from 'src/common/dto'
import { PostResponseDto } from 'src/modules/posts/dto'
import { TopicSlugDto } from 'src/modules/topics/dto'
import { GetTopicPostParamDto, TopicPostsResponseDto } from './dto'

@ApiTags('Topic')
@Controller('topic')
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Get(':topicSlug')
    @ApiOperation({ summary: 'Get posts by topic slug' })
    @ApiParam({ name: 'topicSlug', description: 'The topic slug associated with the post.' })
    @ApiQuery({
        name: 'cursor',
        required: false,
        type: Number,
        description: 'The ID of the last post from the previous page.',
        default: null,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'The number of posts to return. Max is 20.',
        default: 10,
    })
    @ApiResponse({ status: 200, description: 'Return posts in the topic.', type: TopicPostsResponseDto })
    @ApiNotFoundResponse({ description: 'Topic not found' })
    @ApiBadRequestResponse({ description: 'Invalid payload.' })
    async findByTopic(
        @Param() { topicSlug }: TopicSlugDto,
        @Query() { cursor, limit }: CursorPaginationDto,
    ): Promise<TopicPostsResponseDto> {
        return this.topicService.postsFindByTopicSlug(topicSlug, cursor, limit)
    }

    @Get(':topicSlug/:topicLocalId')
    @ApiOperation({ summary: 'Get a post by topicSlug and topicLocalId' })
    @ApiParam({ name: 'topicSlug', description: 'The topic slug associated with the post.' })
    @ApiParam({ name: 'topicLocalId', description: 'The local ID of the post within the topic.' })
    @ApiResponse({ status: 200, description: 'Return a single post in topic by topicLocalId', type: PostResponseDto })
    @ApiNotFoundResponse({ description: 'Post not found' })
    @ApiBadRequestResponse({ description: 'Invalid payload.' })
    findByTopicLocalId(@Param() { topicSlug, topicLocalId }: GetTopicPostParamDto): Promise<PostResponseDto> {
        return this.topicService.postFindByTopicLocalId(topicSlug, topicLocalId)
    }
}

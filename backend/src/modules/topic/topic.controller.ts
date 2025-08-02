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

import { CursorPaginationDto } from 'src/common/dto/pagination.dto'
import { PostResponseDto, PostsResponseDto } from 'src/modules/posts/dto/response.dto'
import { TopicNameDto } from 'src/modules/topics/dto/base.dto'
import { GetTopicPostParamDto } from './dto/request.dto'
import { TopicPostsResponseDto } from './dto/response.dto'

@ApiTags('Topic')
@Controller('topic')
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Get(':topicName')
    @ApiOperation({ summary: 'Get posts by topic name' })
    @ApiParam({ name: 'topicName', description: 'The topic name associated with the post.' })
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
        @Param() { topicName }: TopicNameDto,
        @Query() { cursor, limit }: CursorPaginationDto,
    ): Promise<TopicPostsResponseDto> {
        return this.topicService.postsFindByTopicName(topicName, cursor, limit)
    }

    @Get(':topicName/:topicLocalId')
    @ApiOperation({ summary: 'Get a post by topicName and topicLocalId' })
    @ApiParam({ name: 'topicName', description: 'The topic name associated with the post.' })
    @ApiParam({ name: 'topicLocalId', description: 'The local ID of the post within the topic.' })
    @ApiResponse({ status: 200, description: 'Return a single post in topic by topicLocalId', type: PostResponseDto })
    @ApiNotFoundResponse({ description: 'Post not found' })
    @ApiBadRequestResponse({ description: 'Invalid payload.' })
    findByTopicLocalId(@Param() { topicName, topicLocalId }: GetTopicPostParamDto): Promise<PostResponseDto> {
        return this.topicService.postFindByTopicLocalId(topicName, topicLocalId)
    }
}

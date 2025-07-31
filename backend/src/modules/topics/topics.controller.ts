import { Controller, Post, Body, UseGuards, Request, Get, Param, Query } from '@nestjs/common'
import { TopicsService } from './topics.service'
import { CreateTopicDto } from './dto/create-topic.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import {
    ApiBearerAuth,
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiNotFoundResponse,
    ApiQuery,
} from '@nestjs/swagger'
import { AuthenticatedRequest } from '../../common/types/express-request.interface'
import { CursorPaginationDto, TopicNameDto } from 'src/common/types/default.dto'

@ApiTags('Topics')
@Controller('topics')
export class TopicsController {
    constructor(private readonly topicService: TopicsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    @ApiOperation({ summary: 'Create a new topic' })
    @ApiResponse({ status: 201, description: 'Topic created successfully' })
    @ApiBadRequestResponse({ description: 'Invalid request' })
    @ApiConflictResponse({ description: 'Topic already exists' })
    create(@Body() dto: CreateTopicDto, @Request() req: AuthenticatedRequest) {
        return this.topicService.create(dto, req.user.userId)
    }

    @Get()
    @ApiOperation({ summary: 'Get all topics with pagination' })
    @ApiResponse({ status: 200, description: 'Return a list of topics' })
    @ApiBadRequestResponse({ description: 'Invalid cursor or limit.' })
    @ApiQuery({
        name: 'cursor',
        required: false,
        type: Number,
        description: 'The ID of the last topic from the previous page. Returns topics with smaller IDs.',
        default: null,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'The number of topics to return. Max is 20.',
        default: 10,
    })
    findAll(@Query() { cursor, limit }: CursorPaginationDto) {
        return this.topicService.findAll(cursor, limit)
    }

    @Get(':topicName')
    @ApiOperation({ summary: 'Get a single topic by name' })
    @ApiResponse({ status: 200, description: 'Return a single topic' })
    @ApiNotFoundResponse({ description: 'Topic not found' })
    findByName(@Param() { topicName }: TopicNameDto) {
        return this.topicService.findByName(topicName)
    }
}

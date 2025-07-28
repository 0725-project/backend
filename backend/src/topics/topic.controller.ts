import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common'
import { TopicService } from './topic.service'
import { CreateTopicDto } from './dto/create-topic.dto'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import {
    ApiBearerAuth,
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger'
import { AuthenticatedRequest } from '../common/types/express-request.interface'
import { TopicNameDto } from 'src/common/types/default.dto'

@ApiTags('Topics')
@Controller('topics')
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

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
    @ApiOperation({ summary: 'Get all topics' })
    @ApiResponse({ status: 200, description: 'Return a list of topics' })
    findAll() {
        return this.topicService.findAll()
    }

    @Get(':topicName')
    @ApiOperation({ summary: 'Get a single topic by name' })
    @ApiResponse({ status: 200, description: 'Return a single topic' })
    @ApiNotFoundResponse({ description: 'Topic not found' })
    findByName(@Param() { topicName }: TopicNameDto) {
        return this.topicService.findByName(topicName)
    }
}

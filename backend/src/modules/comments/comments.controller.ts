import { Controller, Post, Body, Get, Query, Param, UseGuards, Req } from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
    ApiQuery,
    ApiParam,
} from '@nestjs/swagger'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { CursorPaginationDto, PostIdDto } from 'src/common/types/default.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { AuthenticatedRequest } from 'src/common/types/express-request.interface'

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new comment' })
    @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiBadRequestResponse({ description: 'Invalid payload.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    create(@Body() dto: CreateCommentDto, @Req() req: AuthenticatedRequest) {
        return this.commentsService.create(dto, req.user.userId)
    }

    @Get(':postId')
    @ApiOperation({ summary: 'Get comments for a post' })
    @ApiResponse({ status: 200, description: 'Return paginated comments.' })
    @ApiBadRequestResponse({ description: 'Invalid cursor or limit.' })
    @ApiParam({ name: 'postId', type: Number, description: 'ID of the post to get comments for.' })
    @ApiQuery({
        name: 'cursor',
        required: false,
        type: Number,
        description: 'The ID of the last comment from the previous page. Returns comments with smaller IDs.',
        default: null,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'The number of comments to return. Max is 20.',
        default: 10,
    })
    getComments(@Param() { postId }: PostIdDto, @Query() dto: CursorPaginationDto) {
        return this.commentsService.getComments(postId, dto)
    }
}

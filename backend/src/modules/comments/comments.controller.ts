import { Controller, Post, Body, Get, Query, Param, UseGuards, Req, Put, Delete } from '@nestjs/common'
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
    ApiForbiddenResponse,
} from '@nestjs/swagger'
import { CommentsService } from './comments.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { AuthenticatedRequest } from 'src/common/types/express-request.interface'
import { CommentResponseDto, CommentsResponseDto, CreateCommentDto, UpdateCommentDto } from './comments.dto'
import { PostIdDto } from '../posts/posts.dto'
import { CursorPaginationDto, IdDto } from 'src/common/types/default.dto'

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new comment' })
    @ApiResponse({ status: 201, description: 'The comment has been successfully created.', type: CommentResponseDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiBadRequestResponse({ description: 'Invalid payload.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    create(@Body() dto: CreateCommentDto, @Req() req: AuthenticatedRequest): Promise<CommentResponseDto> {
        return this.commentsService.create(dto, req.user.userId)
    }

    @Get(':postId')
    @ApiOperation({ summary: 'Get comments for a post' })
    @ApiResponse({ status: 200, description: 'Return paginated comments.', type: CommentsResponseDto })
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
    getComments(@Param() { postId }: PostIdDto, @Query() dto: CursorPaginationDto): Promise<CommentsResponseDto> {
        return this.commentsService.getComments(postId, dto)
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a comment' })
    @ApiResponse({ status: 200, description: 'The comment has been successfully updated.', type: CommentResponseDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiBadRequestResponse({ description: 'Invalid payload.' })
    @ApiNotFoundResponse({ description: 'Comment not found.' })
    @ApiForbiddenResponse({ description: 'You do not have permission to edit this comment.' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of the comment to update.' })
    update(
        @Param() { id }: IdDto,
        @Body() dto: UpdateCommentDto,
        @Req() req: AuthenticatedRequest,
    ): Promise<CommentResponseDto> {
        return this.commentsService.update(id, dto, req.user.userId)
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a comment' })
    @ApiResponse({ status: 204, description: 'The comment has been successfully deleted.', type: CommentResponseDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiBadRequestResponse({ description: 'Invalid ID.' })
    @ApiNotFoundResponse({ description: 'Comment not found.' })
    @ApiForbiddenResponse({ description: 'You do not have permission to delete this comment.' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of the comment to delete.' })
    delete(@Param() { id }: IdDto, @Req() req: AuthenticatedRequest): Promise<CommentResponseDto> {
        return this.commentsService.delete(id, req.user.userId)
    }
}

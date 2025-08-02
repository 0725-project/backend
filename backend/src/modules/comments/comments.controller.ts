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
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { AuthenticatedRequest } from 'src/common/types/express-request.interface'

import { IdDto, CursorPaginationDto } from 'src/common/dto'
import {
    CommentResponseDto,
    CommentsResponseDto,
    CreateCommentResponseDto,
    CreateCommentDto,
    UpdateCommentDto,
} from './dto'
import { PostIdDto } from 'src/modules/posts/dto'

@ApiTags('Comments')
@Controller()
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('posts/:postId/comments')
    @ApiOperation({ summary: 'Create a new comment' })
    @ApiResponse({
        status: 201,
        description: 'The comment has been successfully created.',
        type: CreateCommentResponseDto,
    })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiBadRequestResponse({ description: 'Invalid payload.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    create(
        @Param() { postId }: PostIdDto,
        @Body() dto: CreateCommentDto,
        @Req() req: AuthenticatedRequest,
    ): Promise<CreateCommentResponseDto> {
        return this.commentsService.create(postId, dto, req.user.userId)
    }

    @Get('posts/:postId/comments')
    @ApiOperation({ summary: 'Get comments for a post' })
    @ApiResponse({ status: 200, description: 'Return paginated comments.', type: CommentsResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid cursor or limit.' })
    getComments(@Param() { postId }: PostIdDto, @Query() dto: CursorPaginationDto): Promise<CommentsResponseDto> {
        return this.commentsService.getComments(postId, dto)
    }

    @Put('comments/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a comment' })
    @ApiResponse({ status: 200, description: 'The comment has been successfully updated.', type: CommentResponseDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiBadRequestResponse({ description: 'Invalid payload.' })
    @ApiNotFoundResponse({ description: 'Comment not found.' })
    @ApiForbiddenResponse({ description: 'You do not have permission to edit this comment.' })
    update(
        @Param() { id }: IdDto,
        @Body() dto: UpdateCommentDto,
        @Req() req: AuthenticatedRequest,
    ): Promise<CommentResponseDto> {
        return this.commentsService.update(id, dto, req.user.userId)
    }

    @Delete('comments/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a comment' })
    @ApiResponse({ status: 204, description: 'The comment has been successfully deleted.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiBadRequestResponse({ description: 'Invalid ID.' })
    @ApiNotFoundResponse({ description: 'Comment not found.' })
    @ApiForbiddenResponse({ description: 'You do not have permission to delete this comment.' })
    delete(@Param() { id }: IdDto, @Req() req: AuthenticatedRequest) {
        return this.commentsService.delete(id, req.user.userId)
    }
}

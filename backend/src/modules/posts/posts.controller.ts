import {
    Controller,
    Get,
    Body,
    Param,
    Delete,
    Put,
    Request,
    UseGuards,
    Post as HttpPost,
    Query,
    Ip,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiNotFoundResponse,
    ApiForbiddenResponse,
    ApiBadRequestResponse,
    ApiQuery,
} from '@nestjs/swagger'
import { AuthenticatedRequest } from 'src/common/types/express-request.interface'

import { IdDto } from 'src/common/dto/base'
import { CursorPaginationDto } from 'src/common/dto/pagination.dto'
import { CreatePostDto, UpdatePostDto } from './dto/request.dto'
import { CreatePostResponseDto, PostResponseDto, PostsResponseDto } from './dto/response.dto'

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpPost()
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: 201, description: 'The post has been successfully created.', type: CreatePostResponseDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiBadRequestResponse({ description: 'Invalid payload.' })
    create(
        @Body() createPostDto: CreatePostDto,
        @Request() req: AuthenticatedRequest,
        @Ip() ip: string,
    ): Promise<CreatePostResponseDto> {
        return this.postsService.create(createPostDto, req.user.userId, ip)
    }

    @Get()
    @ApiOperation({ summary: 'Get posts with page id cursor based pagination' })
    @ApiResponse({ status: 200, description: 'Return paginated posts.', type: PostsResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid cursor or limit.' })
    @ApiQuery({
        name: 'cursor',
        required: false,
        type: Number,
        description: 'The ID of the last post from the previous page. Returns posts with smaller IDs.',
        default: null,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'The number of posts to return. Max is 20.',
        default: 10,
    })
    findAll(@Query() { cursor, limit }: CursorPaginationDto): Promise<PostsResponseDto> {
        return this.postsService.findAll(cursor, limit)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single post by id' })
    @ApiResponse({ status: 200, description: 'Return a single post.', type: PostResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid ID.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    async findOne(@Param() { id }: IdDto, @Ip() ip: string): Promise<PostResponseDto> {
        const post = await this.postsService.findOne(id)
        await this.postsService.incrementViewCount(post.id, ip)

        return post
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    @ApiOperation({ summary: 'Update a post' })
    @ApiResponse({ status: 200, description: 'The post has been successfully updated.', type: PostResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid ID or payload.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    @ApiForbiddenResponse({ description: 'You are not the author of this post.' })
    update(
        @Param() { id }: IdDto,
        @Body() updatePostDto: UpdatePostDto,
        @Request() req: AuthenticatedRequest,
    ): Promise<PostResponseDto> {
        return this.postsService.update(id, updatePostDto, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a post' })
    @ApiResponse({ status: 200, description: 'The post has been successfully deleted.' })
    @ApiBadRequestResponse({ description: 'Invalid ID.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    @ApiForbiddenResponse({ description: 'You are not the author of this post.' })
    delete(@Param() { id }: IdDto, @Request() req: AuthenticatedRequest) {
        return this.postsService.delete(id, req.user.userId)
    }
}

import { Controller, Get, Body, Param, Delete, Put, Request, UseGuards, Post as HttpPost, Query } from '@nestjs/common'
import { PostsService } from './posts.service'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
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
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { AuthenticatedRequest } from 'src/common/types/express-request.interface'
import { IdDto } from 'src/common/types/default.dto'
import { GetPostsQueryDto } from './dto/get-posts.dto'

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    @ApiOperation({ summary: 'Get posts with page id cursor based pagination' })
    @ApiResponse({ status: 200, description: 'Return paginated posts.' })
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
    async findAll(@Query() getPostsQueryDto: GetPostsQueryDto) {
        return this.postsService.findAll(getPostsQueryDto.cursor, getPostsQueryDto.limit)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single post by id' })
    @ApiResponse({ status: 200, description: 'Return a single post.' })
    @ApiBadRequestResponse({ description: 'Invalid ID.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    findOne(@Param() { id }: IdDto) {
        return this.postsService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpPost()
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: 201, description: 'The post has been successfully created.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiBadRequestResponse({ description: 'Invalid post data.' })
    create(@Body() createPostDto: CreatePostDto, @Request() req: AuthenticatedRequest) {
        return this.postsService.create(createPostDto, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    @ApiOperation({ summary: 'Update a post' })
    @ApiResponse({ status: 200, description: 'The post has been successfully updated.' })
    @ApiBadRequestResponse({ description: 'Invalid ID' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    @ApiForbiddenResponse({ description: 'You are not the author of this post.' })
    update(@Param() { id }: IdDto, @Body() updatePostDto: UpdatePostDto, @Request() req: AuthenticatedRequest) {
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
    remove(@Param() { id }: IdDto, @Request() req: AuthenticatedRequest) {
        return this.postsService.remove(id, req.user.userId)
    }
}

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

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    @ApiOperation({ summary: 'Get posts with page id cursor based pagination' })
    @ApiResponse({ status: 200, description: 'Return paginated posts.' })
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
    async findAll(@Query('cursor') cursor?: string, @Query('limit') limit?: string) {
        const parsedCursor = cursor ? parseInt(cursor, 10) : void 0
        const parsedLimit = limit ? parseInt(limit, 10) : 10
        return this.postsService.findAll(parsedCursor, parsedLimit)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single post by id' })
    @ApiResponse({ status: 200, description: 'Return a single post.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(+id)
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
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    @ApiForbiddenResponse({ description: 'You are not the author of this post.' })
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() req: AuthenticatedRequest) {
        return this.postsService.update(+id, updatePostDto, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a post' })
    @ApiResponse({ status: 200, description: 'The post has been successfully deleted.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    @ApiForbiddenResponse({ description: 'You are not the author of this post.' })
    remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
        return this.postsService.remove(+id, req.user.userId)
    }
}

import { Controller, Get, Body, Param, Delete, Put, Request, UseGuards, Post } from '@nestjs/common'
import { PostsService } from './posts.service'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { AuthenticatedRequest } from 'src/common/guards/express-request.interface'

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, description: 'Return all posts.' })
    findAll() {
        return this.postsService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single post by id' })
    @ApiResponse({ status: 200, description: 'Return a single post.' })
    @ApiResponse({ status: 404, description: 'Post not found.' })
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(+id)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: 201, description: 'The post has been successfully created.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    create(@Body() createPostDto: CreatePostDto, @Request() req: AuthenticatedRequest) {
        return this.postsService.create(createPostDto, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    @ApiOperation({ summary: 'Update a post' })
    @ApiResponse({ status: 200, description: 'The post has been successfully updated.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Post not found.' })
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() req: AuthenticatedRequest) {
        return this.postsService.update(+id, updatePostDto, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a post' })
    @ApiResponse({ status: 200, description: 'The post has been successfully deleted.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Post not found.' })
    remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
        return this.postsService.remove(+id, req.user.userId)
    }
}

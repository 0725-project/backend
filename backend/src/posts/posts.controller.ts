import { Controller, Get, Body, Param, Delete, Put, Request, UseGuards, Post } from '@nestjs/common'
import { PostsService } from './posts.service'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator'

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    findAll() {
        return this.postsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(+id)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    create(@Body() body: { title: string; content: string }, @Request() req) {
        return this.postsService.create(body.title, body.content, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() body: { title: string; content: string }) {
        return this.postsService.update(+id, body.title, body.content)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id)
    }
}

import { Controller, Get, Query } from '@nestjs/common'
import { SearchService } from './search.service'
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger'

import { SearchPostsQueryDto } from './dto/request.dto'
import { PostsResponseDto } from 'src/modules/posts/dto/response.dto'

@ApiTags('Search')
@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    @ApiOperation({ summary: 'Search posts by author and/or keyword with pagination' })
    @ApiQuery({ name: 'q', required: false, description: 'Keyword in title or content' })
    @ApiQuery({ name: 'author', required: false, description: 'Author name' })
    @ApiQuery({ name: 'topicName', required: false, description: 'Topic name' })
    @ApiQuery({ name: 'cursor', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number, default: 10 })
    @ApiQuery({
        name: 'order',
        required: false,
        description: 'Sort order: asc or desc',
        enum: ['asc', 'desc'],
        default: 'desc',
    })
    @ApiQuery({ name: 'startDate', required: false, description: 'Start date (YYYY-MM-DD or ISO string)' })
    @ApiQuery({ name: 'endDate', required: false, description: 'End date (YYYY-MM-DD or ISO string)' })
    @ApiResponse({ status: 200, description: 'Search results', type: PostsResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid query parameters' })
    search(@Query() query: SearchPostsQueryDto): Promise<PostsResponseDto> {
        return this.searchService.search(query)
    }
}

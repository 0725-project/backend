import { Controller, Get, Query } from '@nestjs/common'
import { SearchService } from './search.service'
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger'

import { PostsResponseDto } from 'src/modules/posts/dto'
import { SearchPostsQueryDto } from './dto'

@ApiTags('Search')
@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    @ApiOperation({ summary: 'Search posts by author and/or keyword with pagination' })
    @ApiResponse({ status: 200, description: 'Search results', type: PostsResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid query parameters' })
    search(@Query() query: SearchPostsQueryDto): Promise<PostsResponseDto> {
        return this.searchService.search(query)
    }
}

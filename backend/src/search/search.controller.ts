import { Controller, Get, Query } from '@nestjs/common'
import { SearchService } from './search.service'
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger'

@ApiTags('Search')
@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    @ApiOperation({ summary: 'Search posts by author and/or keyword with pagination' })
    @ApiQuery({ name: 'q', required: false, description: 'Keyword in title or content' })
    @ApiQuery({ name: 'author', required: false, description: 'Author name' })
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
    @ApiResponse({ status: 200 })
    @ApiBadRequestResponse({ description: 'Invalid query parameters' })
    search(
        @Query('q') keyword?: string,
        @Query('author') author?: string,
        @Query('cursor') cursor?: string,
        @Query('limit') limit?: string,
        @Query('order') order?: 'asc' | 'desc',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.searchService.search(
            keyword,
            author,
            cursor ? parseInt(cursor, 10) : undefined,
            limit ? parseInt(limit, 10) : 10,
            order,
            startDate,
            endDate,
        )
    }
}

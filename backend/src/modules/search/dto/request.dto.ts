import { IsOptional, IsString, IsIn, IsISO8601 } from 'class-validator'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'

import { CursorPaginationDto } from 'src/common/dto'

export class SearchPostsQueryDto extends IntersectionType(CursorPaginationDto) {
    @ApiProperty({
        description: 'Search query for post content.',
        required: false,
        example: 'nestjs',
    })
    @IsOptional()
    @IsString()
    q?: string

    @ApiProperty({
        description: 'Filter by author username.',
        required: false,
        example: 'foo',
    })
    @IsOptional()
    @IsString()
    author?: string

    @ApiProperty({
        description: 'Filter by topic slug.',
        required: false,
        example: 'programming',
    })
    @IsOptional()
    @IsString()
    topicSlug?: string

    @ApiProperty({
        description: 'Order of the results.',
        required: false,
        enum: ['asc', 'desc'],
        default: 'desc',
    })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc' = 'desc'

    @ApiProperty({
        description: 'Start date for filtering posts.',
        required: false,
        example: '2024-07-25T00:00:00Z',
    })
    @IsOptional()
    @IsISO8601()
    startDate?: string

    @ApiProperty({
        description: 'End date for filtering posts.',
        required: false,
        example: '2025-07-25T00:00:00Z',
    })
    @IsOptional()
    @IsISO8601()
    endDate?: string
}

import { IsOptional, IsString, IsIn, IsISO8601 } from 'class-validator'
import { IntersectionType } from '@nestjs/swagger'

import { CursorPaginationDto } from 'src/common/dto'

export class SearchPostsQueryDto extends IntersectionType(CursorPaginationDto) {
    @IsOptional()
    @IsString()
    q?: string

    @IsOptional()
    @IsString()
    author?: string

    @IsOptional()
    @IsString()
    topicName?: string

    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc' = 'desc'

    @IsOptional()
    @IsISO8601()
    startDate?: string

    @IsOptional()
    @IsISO8601()
    endDate?: string
}

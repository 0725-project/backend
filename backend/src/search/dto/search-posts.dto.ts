import { IsOptional, IsString, IsInt, IsIn, IsISO8601, Min, Max } from 'class-validator'
import { CursorPaginationDto } from 'src/common/types/default.dto'

export class SearchPostsQueryDto extends CursorPaginationDto {
    @IsOptional()
    @IsString()
    q?: string

    @IsOptional()
    @IsString()
    author?: string

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

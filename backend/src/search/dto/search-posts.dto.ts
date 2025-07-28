import { IsOptional, IsString, IsInt, IsIn, IsISO8601, Min, Max } from 'class-validator'
import { Type } from 'class-transformer'

export class SearchPostsQueryDto {
    @IsOptional()
    @IsString()
    q?: string

    @IsOptional()
    @IsString()
    author?: string

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    cursor?: number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(20)
    limit?: number = 10

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

import { IsOptional, IsString, IsInt, IsIn, IsISO8601 } from 'class-validator'
import { Type } from 'class-transformer'

export class GetPostsQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    cursor?: number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    limit?: number = 10
}

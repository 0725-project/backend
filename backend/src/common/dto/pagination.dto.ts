import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsInt, IsOptional, Min, Max } from 'class-validator'
import { Type } from 'class-transformer'

export class CursorPaginationDto {
    @ApiProperty({
        description: 'The cursor for pagination, used to fetch the next set of results.',
        required: false,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    cursor?: number

    @ApiProperty({
        description: 'The number of items to return per page. Maximum is 20.',
        example: 10,
        required: false,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(20)
    limit?: number = 10
}

export class CursorPaginationResponseDto {
    @ApiProperty({
        description: 'The next cursor for pagination, used to fetch the next set of results.',
        required: false,
        example: 2,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    nextCursor?: number | null
}

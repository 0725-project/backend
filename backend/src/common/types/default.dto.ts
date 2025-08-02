import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsInt, IsString, IsOptional, Min, Max, Matches, MaxLength } from 'class-validator'
import { Type } from 'class-transformer'

export class IdDto {
    @ApiProperty({
        description: 'The ID of the resource.',
        example: 1,
    })
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    id: number
}

export class CursorPaginationDto {
    @ApiProperty({
        description: 'The cursor for pagination, used to fetch the next set of results.',
        example: 10,
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

export class CreatedAtDto {
    @ApiProperty({
        description: 'The creation date of the resource.',
        example: '2023-10-01T12:00:00Z',
    })
    @Type(() => Date)
    @IsNotEmpty()
    @IsString()
    createdAt: Date
}

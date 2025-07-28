import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsInt, IsString, IsOptional, Min, Max } from 'class-validator'
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

export class UsernameDto {
    @ApiProperty({
        description: 'The username of the user.',
        example: 'foo',
    })
    @IsString()
    @IsNotEmpty()
    username: string
}

export class CursorPaginationDto {
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
}

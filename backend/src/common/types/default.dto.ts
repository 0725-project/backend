import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsInt, IsString } from 'class-validator'
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

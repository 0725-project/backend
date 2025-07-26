import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class LoginDto {
    @ApiProperty({
        description: 'The username of the user.',
        example: 'testuser',
    })
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({
        description: 'The password of the user.',
        example: 'password123',
    })
    @IsString()
    @IsNotEmpty()
    password: string
}

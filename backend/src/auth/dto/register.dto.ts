import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class RegisterDto {
    @ApiProperty({ example: 'foo', description: 'Username' })
    @IsString()
    username: string

    @ApiProperty({ example: 'securePassword1234@', description: 'Password' })
    @IsString()
    @MinLength(6)
    password: string
}

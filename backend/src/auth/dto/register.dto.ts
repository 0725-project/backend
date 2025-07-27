import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength, IsNotEmpty } from 'class-validator'

export class RegisterDto {
    @ApiProperty({ example: 'foo', description: 'Username' })
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({ example: 'securePassword1234@', description: 'Password' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string
}

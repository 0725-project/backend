import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength, IsNotEmpty } from 'class-validator'
import { UsernameDto } from 'src/common/types/default.dto'

export class RegisterDto extends UsernameDto {
    @ApiProperty({ example: 'securePassword1234@', description: 'Password' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string

    @ApiProperty({ example: 'foo@example.com', description: 'Email address' })
    @IsString()
    @IsNotEmpty()
    email: string
}

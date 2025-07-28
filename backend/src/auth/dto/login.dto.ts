import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
import { UsernameDto } from 'src/common/types/default.dto'

export class LoginDto extends UsernameDto {
    @ApiProperty({
        description: 'The password of the user.',
        example: 'password123',
    })
    @IsString()
    @IsNotEmpty()
    password: string
}

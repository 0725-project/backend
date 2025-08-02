import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
import { EmailDto, NicknameDto, PasswordDto, UsernameDto, UserResponseDto } from '../users/user.dto'
import { IdDto } from 'src/common/dto/default.dto'

export class AccessTokenDto {
    @ApiProperty({ description: 'Access token for authenticated user', example: 'XXX.YYY.ZZZ' })
    @IsString()
    @IsNotEmpty()
    accessToken: string
}

export class LoginDto extends IntersectionType(UsernameDto, PasswordDto) {}
export class LoginResponseDto extends IntersectionType(IdDto, AccessTokenDto) {}
export class RegisterDto extends IntersectionType(UsernameDto, NicknameDto, PasswordDto, EmailDto) {}
export class RegisterResponseDto extends IntersectionType(UserResponseDto) {}

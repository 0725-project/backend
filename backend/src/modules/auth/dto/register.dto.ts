import { IntersectionType } from '@nestjs/swagger'
import { EmailDto, NicknameDto, PasswordDto, UsernameDto } from 'src/common/types/default.dto'
import { UserResponseDto } from 'src/common/types/response.dto'

export class RegisterDto extends IntersectionType(UsernameDto, NicknameDto, PasswordDto, EmailDto) {}

export class RegisterResponseDto extends IntersectionType(UserResponseDto) {}

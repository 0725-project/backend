import { IntersectionType } from '@nestjs/swagger'

import { EmailDto, NicknameDto, PasswordDto, UsernameDto } from 'src/modules/users/dto'

export class LoginDto extends IntersectionType(UsernameDto, PasswordDto) {}
export class RegisterDto extends IntersectionType(UsernameDto, NicknameDto, PasswordDto, EmailDto) {}

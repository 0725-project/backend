import { IntersectionType } from '@nestjs/swagger'
import { EmailDto, NicknameDto, PasswordDto, UsernameDto } from 'src/common/types/default.dto'

export class RegisterDto extends IntersectionType(UsernameDto, NicknameDto, PasswordDto, EmailDto) {}

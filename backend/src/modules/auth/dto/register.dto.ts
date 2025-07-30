import { IntersectionType } from '@nestjs/swagger'
import { EmailDto, PasswordDto, UsernameDto } from 'src/common/types/default.dto'

export class RegisterDto extends IntersectionType(UsernameDto, PasswordDto, EmailDto) {}

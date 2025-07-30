import { PasswordDto, UsernameDto } from 'src/common/types/default.dto'
import { IntersectionType } from '@nestjs/swagger'

export class LoginDto extends IntersectionType(UsernameDto, PasswordDto) {}

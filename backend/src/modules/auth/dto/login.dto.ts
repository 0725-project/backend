import { IdDto, PasswordDto, UsernameDto } from 'src/common/types/default.dto'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { AccessTokenDto } from 'src/common/types/response.dto'

export class LoginDto extends IntersectionType(UsernameDto, PasswordDto) {}

export class LoginResponseDto extends IntersectionType(IdDto, AccessTokenDto) {}

import { IntersectionType } from '@nestjs/swagger'

import { IdDto } from 'src/common/dto'
import { UserResponseDto } from 'src/modules/users/dto'
import { AccessTokenDto } from '.'

export class LoginResponseDto extends IntersectionType(IdDto, AccessTokenDto) {}
export class RegisterResponseDto extends IntersectionType(UserResponseDto) {}

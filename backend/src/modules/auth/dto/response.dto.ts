import { IntersectionType } from '@nestjs/swagger'

import { IdDto } from 'src/common/dto/base'
import { UserResponseDto } from 'src/modules/users/dto/response.dto'
import { AccessTokenDto } from './base.dto'

export class LoginResponseDto extends IntersectionType(IdDto, AccessTokenDto) {}
export class RegisterResponseDto extends IntersectionType(UserResponseDto) {}

import { IntersectionType } from '@nestjs/swagger'
import { CreatedAtDto, IdDto } from 'src/common/dto/base'
import { EmailDto, NicknameDto, UsernameDto } from './base.dto'

export class UserResponseDto extends IntersectionType(IdDto, UsernameDto, NicknameDto, EmailDto, CreatedAtDto) {}
export class UserBriefResponseDto extends IntersectionType(IdDto, UsernameDto, NicknameDto) {}

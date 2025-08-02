import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { IsString, IsNotEmpty, MaxLength, Matches, IsOptional } from 'class-validator'
import { CreatedAtDto, IdDto } from 'src/common/types/default.dto'

export class UsernameDto {
    @ApiProperty({
        description: 'The username of the user.',
        example: 'foo',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    @Matches(/^[a-z0-9_]+$/, { message: 'The username must be lowercase letters, numbers, or underscores.' })
    username: string
}

export class NicknameDto {
    @ApiProperty({
        description: 'The nickname of the user.',
        example: 'Kim Jun Young',
    })
    @IsString()
    @MaxLength(32)
    @IsOptional()
    nickname?: string
}

export class PasswordDto {
    @ApiProperty({
        description: 'The password of the user.',
        example: 'securePassword1234@',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    password: string
}

export class EmailDto {
    @ApiProperty({
        description: 'The email address of the user.',
        example: 'foo@example.com',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(320)
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    email: string
}

export class UserResponseDto extends IntersectionType(IdDto, UsernameDto, NicknameDto, EmailDto, CreatedAtDto) {}

export class UserBriefResponseDto extends IntersectionType(IdDto, UsernameDto, NicknameDto) {}

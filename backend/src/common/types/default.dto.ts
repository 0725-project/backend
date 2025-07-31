import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsInt, IsString, IsOptional, Min, Max, Matches, MaxLength } from 'class-validator'
import { Type } from 'class-transformer'

export class IdDto {
    @ApiProperty({
        description: 'The ID of the resource.',
        example: 1,
    })
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    id: number
}

export class PostIdDto {
    @ApiProperty({
        description: 'The ID of the post.',
        example: 1,
    })
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    postId: number
}

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

export class PostTitleDto {
    @ApiProperty({
        description: 'The title of the post.',
        example: 'My First Post',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string
}

export class CursorPaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    cursor?: number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(20)
    limit?: number = 10
}

export class TopicNameDto {
    @ApiProperty({
        description: 'The topic name associated with the post.',
        example: 'programming',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z]+$/, { message: 'The topic name must be in lowercase letters.' })
    @MaxLength(32)
    topicName: string
}

export class TopicDescriptionDto {
    @ApiProperty({
        description: 'The description of the topic.',
        example: 'Programming discussions and resources',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string
}

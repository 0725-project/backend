import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { IsNotEmpty, IsInt, IsString, IsOptional, Min, Max, Matches, MaxLength } from 'class-validator'
import { Type } from 'class-transformer'
import {
    CommentContentDto,
    CursorPaginationDto,
    EmailDto,
    IdDto,
    NicknameDto,
    PostContentDto,
    PostTitleDto,
    TopicLocalIdDto,
    UsernameDto,
    ViewCountDto,
} from './default.dto'

export class AccessTokenDto {
    @ApiProperty({ description: 'Access token for authenticated user', example: 'XXX.YYY.ZZZ' })
    @IsString()
    @IsNotEmpty()
    accessToken: string
}

export class CreatedAtDto {
    @ApiProperty({
        description: 'The creation date of the resource.',
        example: '2023-10-01T12:00:00Z',
    })
    @Type(() => Date)
    @IsNotEmpty()
    @IsString()
    createdAt: Date
}

/** `id`, `username`, `nickname`, `email`, `createdAt` */
export class UserResponseDto extends IntersectionType(IdDto, UsernameDto, NicknameDto, EmailDto, CreatedAtDto) {}

/** `id`, `username`, `nickname` */
export class UserBriefResponseDto extends IntersectionType(IdDto, UsernameDto, NicknameDto) {}

export class TopicResponseDto extends IntersectionType(IdDto, CreatedAtDto) {
    @ApiProperty({
        description: 'The name of the topic.',
        example: 'General Discussion',
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'The description of the topic.',
        example: 'A place for general discussions.',
    })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({
        description: 'The creator of the topic.',
        type: UserBriefResponseDto,
    })
    creator: UserBriefResponseDto
}

export class TopicsResponseDto extends IntersectionType(CursorPaginationDto) {
    @ApiProperty({
        description: 'List of topics.',
        type: [TopicResponseDto],
    })
    topics: TopicResponseDto[]
}

export class TopicBriefResponseDto extends IntersectionType(IdDto) {
    @ApiProperty({
        description: 'The name of the topic.',
        example: 'General Discussion',
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'The description of the topic.',
        example: 'A place for general discussions.',
    })
    @IsString()
    @IsNotEmpty()
    description: string
}

export class PostResponseDto extends IntersectionType(
    IdDto,
    PostTitleDto,
    PostContentDto,
    CreatedAtDto,
    TopicLocalIdDto,
    ViewCountDto,
) {
    @ApiProperty({
        description: 'The author of the post.',
        type: UserBriefResponseDto,
    })
    @IsNotEmpty()
    author: UserBriefResponseDto

    @ApiProperty({
        description: 'The topic of the post.',
        type: TopicBriefResponseDto,
    })
    @IsNotEmpty()
    topic: TopicBriefResponseDto
}

export class PostsResponseDto extends IntersectionType(CursorPaginationDto) {
    @ApiProperty({
        description: 'List of posts.',
        type: [PostResponseDto],
    })
    posts: PostResponseDto[]
}

export class CommentResponseDto extends IntersectionType(IdDto, CommentContentDto, CreatedAtDto) {
    @ApiProperty({
        description: 'The author of the comment.',
        type: UserBriefResponseDto,
    })
    @IsNotEmpty()
    user: UserBriefResponseDto
}

export class CommentsResponseDto extends IntersectionType(CursorPaginationDto) {
    @ApiProperty({
        description: 'List of comments.',
        type: [CommentResponseDto],
    })
    comments: CommentResponseDto[]
}

import { ApiProperty, IntersectionType, OmitType, PartialType } from '@nestjs/swagger'
import { CreatedAtDto, IdDto } from 'src/common/dto/default.dto'
import { CursorPaginationResponseDto } from 'src/common/dto/pagination.dto'
import { TopicBriefResponseDto, TopicLocalIdDto, TopicNameDto } from '../topics/topics.dto'
import { UserBriefResponseDto } from '../users/user.dto'
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { Type } from 'class-transformer'

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

export class PostContentDto {
    @ApiProperty({
        description: 'The content of the post.',
        example: 'This is the content of my first post.',
    })
    @IsString()
    @IsNotEmpty()
    content: string
}

export class ViewCountDto {
    @ApiProperty({
        description: 'The number of views for the post.',
        example: 100,
    })
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    viewCount: number
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

export class PostsResponseDto extends IntersectionType(CursorPaginationResponseDto) {
    @ApiProperty({
        description: 'List of posts.',
        type: [PostResponseDto],
    })
    posts: PostResponseDto[]
}

export class CreatePostDto extends IntersectionType(PostTitleDto, PostContentDto, TopicNameDto) {}
export class UpdatePostDto extends PartialType(OmitType(CreatePostDto, ['topicName'])) {}

export class CreatePostResponseDto extends IntersectionType(OmitType(PostResponseDto, ['author', 'topic'])) {}

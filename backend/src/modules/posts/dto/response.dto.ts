import { IntersectionType } from '@nestjs/swagger'
import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

import { CreatedAtDto, IdDto } from 'src/common/dto/base'
import { CursorPaginationResponseDto } from 'src/common/dto/pagination.dto'
import { TopicLocalIdDto } from 'src/modules/topics/dto/base.dto'
import { TopicBriefResponseDto } from 'src/modules/topics/dto/response.dto'
import { UserBriefResponseDto } from 'src/modules/users/dto/response.dto'
import { PostContentDto, PostTitleDto, ViewCountDto } from './base.dto'

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

export class CreatePostResponseDto extends IntersectionType(OmitType(PostResponseDto, ['author', 'topic'])) {}

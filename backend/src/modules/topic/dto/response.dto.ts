import { IntersectionType } from '@nestjs/swagger'
import { OmitType } from '@nestjs/swagger'

import { CursorPaginationResponseDto } from 'src/common/dto'
import { PostResponseDto } from 'src/modules/posts/dto'

class TopicPostResponseDto extends OmitType(PostResponseDto, ['topicLocalId', 'topic']) {}

export class TopicPostsResponseDto extends IntersectionType(CursorPaginationResponseDto) {
    posts: TopicPostResponseDto[]
}

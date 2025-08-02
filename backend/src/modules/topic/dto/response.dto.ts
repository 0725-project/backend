import { IntersectionType } from '@nestjs/swagger'
import { OmitType } from '@nestjs/swagger'

import { CursorPaginationResponseDto } from 'src/common/dto/pagination.dto'
import { PostResponseDto } from 'src/modules/posts/dto/response.dto'

class TopicPostResponseDto extends OmitType(PostResponseDto, ['topicLocalId', 'topic']) {}

export class TopicPostsResponseDto extends IntersectionType(CursorPaginationResponseDto) {
    posts: TopicPostResponseDto[]
}

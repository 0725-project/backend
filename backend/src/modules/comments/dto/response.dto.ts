import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

import { CreatedAtDto, IdDto } from 'src/common/dto/base'
import { UserBriefResponseDto } from 'src/modules/users/dto/response.dto'
import { CursorPaginationResponseDto } from 'src/common/dto/pagination.dto'
import { CommentContentDto } from './base.dto'

export class CommentResponseDto extends IntersectionType(IdDto, CommentContentDto, CreatedAtDto) {
    @ApiProperty({
        description: 'The author of the comment.',
        type: UserBriefResponseDto,
    })
    @IsNotEmpty()
    user: UserBriefResponseDto
}

export class CommentsResponseDto extends IntersectionType(CursorPaginationResponseDto) {
    @ApiProperty({
        description: 'List of comments.',
        type: [CommentResponseDto],
    })
    comments: CommentResponseDto[]
}

export class CreateCommentResponseDto extends IntersectionType(OmitType(CommentResponseDto, ['user'])) {}

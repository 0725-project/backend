import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

import { CreatedAtDto, IdDto, CursorPaginationResponseDto } from 'src/common/dto'
import { UserBriefResponseDto } from 'src/modules/users/dto'
import { CommentContentDto } from '.'

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

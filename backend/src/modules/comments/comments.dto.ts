import { ApiProperty, IntersectionType, OmitType, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { UserBriefResponseDto } from '../users/user.dto'
import { CreatedAtDto, CursorPaginationResponseDto, IdDto } from 'src/common/types/default.dto'
import { PostIdDto } from '../posts/posts.dto'

export class CommentContentDto {
    @ApiProperty({
        description: 'The content of the comment.',
        example: 'This is a comment on the post.',
    })
    @IsString()
    @IsNotEmpty()
    content: string
}

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

export class CreateCommentDto extends IntersectionType(PostIdDto) {
    @ApiProperty({ description: 'The content of the comment.', example: 'This is a comment.' })
    @IsString()
    content: string
}

export class UpdateCommentDto extends PartialType(OmitType(CreateCommentDto, ['postId'])) {}

export class CreateCommentResponseDto extends IntersectionType(OmitType(CommentResponseDto, ['user'])) {}

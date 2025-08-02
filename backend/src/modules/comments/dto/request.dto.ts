import { ApiProperty, IntersectionType, OmitType, PartialType } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { PostIdDto } from 'src/modules/posts/dto/base.dto'

export class CreateCommentDto extends IntersectionType(PostIdDto) {
    @ApiProperty({ description: 'The content of the comment.', example: 'This is a comment.' })
    @IsString()
    content: string
}

export class UpdateCommentDto extends PartialType(OmitType(CreateCommentDto, ['postId'])) {}

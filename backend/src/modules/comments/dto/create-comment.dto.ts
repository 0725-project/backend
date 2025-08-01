import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { PostIdDto } from 'src/common/types/default.dto'

export class CreateCommentDto extends IntersectionType(PostIdDto) {
    @ApiProperty({ description: 'The content of the comment.', example: 'This is a comment.' })
    @IsString()
    content: string
}

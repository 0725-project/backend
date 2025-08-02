import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateCommentDto {
    @ApiProperty({ description: 'The content of the comment.', example: 'This is a comment.' })
    @IsString()
    content: string
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}

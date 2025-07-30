import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { PostIdDto } from 'src/common/types/default.dto'

export class CreateCommentDto extends IntersectionType(PostIdDto) {
    @ApiProperty({ description: 'Comment content' })
    @IsString()
    content: string
}

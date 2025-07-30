import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
import { PostTitleDto, TopicNameDto } from 'src/common/types/default.dto'

export class CreatePostDto extends IntersectionType(PostTitleDto, TopicNameDto) {
    @ApiProperty({
        description: 'The content of the post.',
        example: 'This is the content of my first post.',
    })
    @IsString()
    @IsNotEmpty()
    content: string
}

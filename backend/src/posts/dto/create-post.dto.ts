import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
import { TopicNameDto } from 'src/common/types/default.dto'
import { IntersectionType } from '@nestjs/swagger'

export class CreatePostDto extends IntersectionType(TopicNameDto) {
    @ApiProperty({
        description: 'The title of the post.',
        example: 'My First Post',
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        description: 'The content of the post.',
        example: 'This is the content of my first post.',
    })
    @IsString()
    @IsNotEmpty()
    content: string
}

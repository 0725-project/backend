import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreatePostDto {
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

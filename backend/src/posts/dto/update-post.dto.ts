import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class UpdatePostDto {
    @ApiProperty({
        description: 'The title of the post.',
        example: 'My Updated Post',
        required: false,
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title?: string

    @ApiProperty({
        description: 'The content of the post.',
        example: 'This is the updated content of my post.',
        required: false,
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content?: string
}

import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class GeneratePresignedUrlRequestDto {
    @ApiProperty({ description: 'The name of the file to be uploaded.', example: 'example.jpg' })
    @IsString()
    @IsNotEmpty()
    filename: string

    @ApiProperty({ description: 'The content type of the file to be uploaded. (MIME type)', example: 'image/jpeg' })
    @IsString()
    @IsNotEmpty()
    contentType: string
}

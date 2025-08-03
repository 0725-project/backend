import { Controller, Post, Body } from '@nestjs/common'
import { UploadService } from './upload.service'
import { GeneratePresignedUrlRequestDto, PresignedUrlResponseDto } from './dto'
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post('presigned-url')
    @ApiOperation({ summary: 'Generate a presigned URL for file upload' })
    @ApiResponse({ status: 201, description: 'Presigned URL generated successfully', type: PresignedUrlResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid request' })
    getPresignedUrl(@Body() dto: GeneratePresignedUrlRequestDto): Promise<PresignedUrlResponseDto> {
        return this.uploadService.generatePresignedUrl(dto)
    }
}

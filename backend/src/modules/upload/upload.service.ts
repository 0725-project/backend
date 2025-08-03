import { Inject, Injectable } from '@nestjs/common'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { ConfigService } from '@nestjs/config'
import { GeneratePresignedUrlRequestDto, PresignedUrlResponseDto } from './dto'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UploadService {
    constructor(
        @Inject('S3_CLIENT')
        private readonly s3: S3Client,
        private readonly configService: ConfigService,
    ) {}

    async generatePresignedUrl(dto: GeneratePresignedUrlRequestDto): Promise<PresignedUrlResponseDto> {
        const key = `uploads/${uuidv4()}/${dto.filename}`

        const command = new PutObjectCommand({
            Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
            Key: key,
            ContentType: dto.contentType,
        })

        return {
            url: await getSignedUrl(this.s3, command, {
                expiresIn: 600, // 10 minutes
            }),
            key,
        }
    }
}

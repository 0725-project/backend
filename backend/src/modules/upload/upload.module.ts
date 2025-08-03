import { Module } from '@nestjs/common'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'
import { ConfigService } from '@nestjs/config'
import { S3Client } from '@aws-sdk/client-s3'

@Module({
    controllers: [UploadController],
    providers: [
        {
            provide: 'S3_CLIENT',
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return new S3Client({
                    region: configService.get<string>('AWS_REGION') ?? 'ap-northeast-2',
                    credentials: {
                        accessKeyId: configService.get('AWS_ACCESS_KEY_ID') ?? '',
                        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY') ?? '',
                    },
                })
            },
        },
        UploadService,
    ],
    exports: [UploadService],
})
export class UploadModule {}

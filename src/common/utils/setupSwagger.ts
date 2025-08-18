import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export const setupSwagger = (app: INestApplication) => {
    const options = new DocumentBuilder()
        .setTitle('NestJS API Docs')
        .setDescription('NestJS API description')
        .setVersion('1.0.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            },
            'access-token',
        )
        .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api-docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    })
}

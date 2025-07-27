import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupSwagger } from './common/utils/setupSwagger'
import { Logger, ValidationPipe } from '@nestjs/common'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'

const PORT = process.env.PORT ?? 3000
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    app.useGlobalInterceptors(new TransformInterceptor())

    const logger = new Logger('Bootstrap')

    if (!IS_PRODUCTION) {
        setupSwagger(app)
    }

    await app.listen(PORT)

    logger.log(`Application is running on: ${await app.getUrl()}`)

    if (!IS_PRODUCTION) {
        logger.log(`Swagger is available at: ${await app.getUrl()}/api-docs`)
    }
}

bootstrap()

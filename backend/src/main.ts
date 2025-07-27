import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupSwagger } from '../utils/setupSwagger'
import { Logger, ValidationPipe } from '@nestjs/common'

const PORT = process.env.PORT ?? 3000

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

    if (process.env.NODE_ENV !== 'production') {
        setupSwagger(app)
    }

    await app.listen(PORT)

    const logger = new Logger('Bootstrap')
    logger.log(`Application is running on: ${await app.getUrl()}`)
    logger.log(`Swagger is available at: ${await app.getUrl()}/api-docs`)
}

bootstrap()

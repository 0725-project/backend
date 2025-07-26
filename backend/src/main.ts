import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupSwagger } from '../utils/setupSwagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

    if (process.env.NODE_ENV !== 'production') {
        setupSwagger(app)
    }

    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()

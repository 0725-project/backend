import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
// import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    controllers: [AppController],
})
export class AppModule {}

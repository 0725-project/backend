import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
    controllers: [AppController],
    imports: [PostsModule, UsersModule, AuthModule],
})
export class AppModule {}

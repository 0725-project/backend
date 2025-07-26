import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
    controllers: [AppController],
    imports: [PostsModule, UsersModule],
})
export class AppModule {}

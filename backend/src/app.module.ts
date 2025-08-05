import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { RedisModule } from './common/redis/redis.module'

import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { PostsModule } from './modules/posts/posts.module'
import { LikesModule } from './modules/likes/likes.module'
import { SearchModule } from './modules/search/search.module'
import { TopicModule } from './modules/topic/topic.module'
import { TopicsModule } from './modules/topics/topics.module'
import { CommentsModule } from './modules/comments/comments.module'
import { UploadModule } from './modules/upload/upload.module'

import { AppController } from './app.controller'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT!, 10),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
        }),
        RedisModule,
        AuthModule,
        UsersModule,
        PostsModule,
        LikesModule,
        TopicModule,
        TopicsModule,
        SearchModule,
        CommentsModule,
        UploadModule,
    ],
    controllers: [AppController],
})
export class AppModule {}

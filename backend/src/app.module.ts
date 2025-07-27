import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { PostsModule } from './posts/posts.module'
import { SearchModule } from './search/search.module'
import { RedisModule } from './common/redis/redis.module'

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
            // synchronize: true,
        }),
        RedisModule,
        UsersModule,
        AuthModule,
        PostsModule,
        SearchModule,
    ],
})
export class AppModule {}

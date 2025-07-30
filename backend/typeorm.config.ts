import { DataSource } from 'typeorm'
import { User } from './src/modules/users/user.entity'
import { Post } from './src/modules/posts/post.entity'
import * as dotenv from 'dotenv'
import { Topic } from 'src/modules/topics/topics.entity'

dotenv.config()

export default new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Post, Topic],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
})

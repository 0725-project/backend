import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer'
import { Post } from '../posts/post.entity'
import { Topic } from 'src/topics/topics.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Exclude()
    @Column()
    password: string

    @Column({ unique: true })
    email: string

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[]

    @OneToMany(() => Topic, (topic) => topic.creator)
    topics: Topic[]
}

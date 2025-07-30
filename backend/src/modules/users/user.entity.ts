import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer'
import { Post } from '../posts/post.entity'
import { Topic } from 'src/modules/topics/topics.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 32, unique: true })
    username: string

    @Exclude()
    @Column({ type: 'varchar', length: 255, select: false })
    password: string

    @Column({ type: 'varchar', length: 320, unique: true })
    email: string

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[]

    @OneToMany(() => Topic, (topic) => topic.creator)
    topics: Topic[]
}

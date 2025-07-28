import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from '../users/user.entity'
import { Post } from '../posts/post.entity'
import { Matches } from 'class-validator'

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @Matches(/^[a-z]+$/, { message: 'The topic name must be in lowercase letters.' })
    name: string

    @ManyToOne(() => User, (user) => user.topics)
    creator: User

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @ManyToOne(() => Post, (post) => post.topic)
    posts: Post[]
}

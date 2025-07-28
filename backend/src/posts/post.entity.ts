import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from '../users/user.entity'
import { Topic } from '../topics/topic.entity'

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column('text')
    content: string

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @ManyToOne(() => User, (user) => user.posts)
    author: User

    @ManyToOne(() => Topic, (topic) => topic.posts)
    topic: Topic
}

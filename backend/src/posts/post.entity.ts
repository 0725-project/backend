import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from '../users/user.entity'
import { Topic } from '../topics/topics.entity'

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    title: string

    @Column({ type: 'text' })
    content: string

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'int' })
    topicLocalId: number

    @ManyToOne(() => User, (user) => user.posts)
    author: User

    @ManyToOne(() => Topic, (topic) => topic.posts)
    topic: Topic
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index, OneToMany } from 'typeorm'
import { User } from '../users/users.entity'
import { Topic } from '../topics/topics.entity'
import { Comment } from '../comments/comments.entity'

@Entity('posts')
@Index(['topic', 'id'])
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

    @Column({ type: 'int', default: 0 })
    viewCount: number

    @ManyToOne(() => User, (user) => user.posts)
    author: User

    @ManyToOne(() => Topic, (topic) => topic.posts)
    topic: Topic

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]
}

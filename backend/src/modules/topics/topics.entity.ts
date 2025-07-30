import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import { User } from '../users/user.entity'
import { Post } from '../posts/post.entity'

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 32, unique: true })
    name: string

    @Column({ type: 'varchar', length: 255 })
    description: string

    @ManyToOne(() => User, (user) => user.topics)
    creator: User

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @OneToMany(() => Post, (post) => post.topic)
    posts: Post[]
}

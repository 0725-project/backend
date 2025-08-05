import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique } from 'typeorm'
import { Exclude } from 'class-transformer'
import { User } from '../users/users.entity'
import { Post } from '../posts/posts.entity'

@Entity('likes')
@Unique(['user', 'post'])
export class Like {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number

    @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Post, { eager: true, onDelete: 'CASCADE' })
    post: Post

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}

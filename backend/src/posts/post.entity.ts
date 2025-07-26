import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from '../users/user.entity'

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column('text')
    content: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.posts)
    author: User
}

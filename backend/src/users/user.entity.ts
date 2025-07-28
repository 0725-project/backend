import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer'
import { Post } from '../posts/post.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Exclude()
    @Column()
    password: string

    @Column()
    email: string

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[]
}

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async create(username: string, password: string) {
        try {
            const hashed = await bcrypt.hash(password, 10)
            const user = this.repo.create({ username, password: hashed })
            return await this.repo.save(user)
        } catch (err) {
            throw new InternalServerErrorException('Failed to create user')
        }
    }

    async findAll() {
        const users = await this.repo.find({ relations: ['posts'] })
        return users
    }

    async findByUsername(username: string) {
        const user = await this.repo.findOne({ where: { username }, relations: ['posts'] })
        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    async findById(id: number) {
        const user = await this.repo.findOne({ where: { id }, relations: ['posts'] })
        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }
}

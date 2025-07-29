import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    async create(username: string, password: string, email: string) {
        const hashed = await bcrypt.hash(password, 10)
        const user = this.userRepo.create({ username, password: hashed, email })
        return await this.userRepo.save(user)
    }

    async findByUsername(username: string) {
        const user = await this.userRepo.findOne({ where: { username } })
        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    async findById(id: number) {
        const user = await this.userRepo.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }
}

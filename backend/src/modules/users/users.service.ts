import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { RegisterDto } from '../auth/auth.dto'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    async create(createUserDto: RegisterDto) {
        const hashed = await bcrypt.hash(createUserDto.password, 10)
        const user = this.userRepo.create({ ...createUserDto, password: hashed })
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

    async getPasswordByUsername(username: string) {
        const user = await this.userRepo
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .select(['user', 'user.password'])
            .getOne()
        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }
}

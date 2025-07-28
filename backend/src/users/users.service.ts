import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { validationId } from 'src/common/utils/validation'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async create(username: string, password: string, email: string) {
        try {
            const hashed = await bcrypt.hash(password, 10)
            const user = this.repo.create({ username, password: hashed, email })
            return await this.repo.save(user)
        } catch (err) {
            throw new InternalServerErrorException('Failed to create user')
        }
    }

    async findByUsername(username: string) {
        const user = await this.repo.findOne({ where: { username } })
        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    async isExistUsername(username: string) {
        const user = await this.repo.findOne({ where: { username } })
        return Boolean(user)
    }

    async isExistEmail(email: string) {
        const user = await this.repo.findOne({ where: { email } })
        return Boolean(user)
    }

    async findById(id: number) {
        validationId(id)

        const user = await this.repo.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }
}

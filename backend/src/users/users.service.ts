import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async create(username: string, password: string) {
        const hashed = await bcrypt.hash(password, 10)
        const user = this.repo.create({ username, password: hashed })
        return this.repo.save(user)
    }

    findAll() {
        return this.repo.find()
    }

    findByUsername(username: string) {
        return this.repo.findOne({ where: { username } })
    }

    findById(id: number) {
        return this.repo.findOne({ where: { id } })
    }
}

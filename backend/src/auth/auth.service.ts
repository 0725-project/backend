import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(username: string, password: string) {
        if (!username || !password) {
            throw new BadRequestException('Username and password are required')
        }

        const user = await this.usersService.findByUsername(username)

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload = { sub: user.id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async register(username: string, password: string) {
        if (!username || !password) {
            throw new BadRequestException('Username and password are required')
        }

        const existing = await this.usersService.findByUsername(username)
        if (existing) {
            throw new ConflictException('Username already exists')
        }

        return this.usersService.create(username, password)
    }
}

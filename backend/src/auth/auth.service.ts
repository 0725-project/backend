import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(username: string, password: string) {
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
        return this.usersService.create(username, password)
    }
}

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN_SECONDS } from '../../common/constants'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { RedisService } from '../../common/redis/redis.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private redisService: RedisService,
    ) {}

    async login(dto: LoginDto) {
        const user = await this.usersService.getPasswordByUsername(dto.username)
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload = { sub: user.id }
        const accessToken = this.jwtService.sign(payload)
        const refreshToken = this.jwtService.sign(payload, { expiresIn: REFRESH_TOKEN_EXPIRES_IN })

        await this.redisService.set(`user:${user.id}:refresh`, refreshToken, REFRESH_TOKEN_EXPIRES_IN_SECONDS)

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user_id: user.id,
        }
    }

    async register(dto: RegisterDto) {
        return this.usersService.create(dto.username, dto.password, dto.email)
    }

    async refresh(userId: number, refreshToken: string) {
        const stored = await this.redisService.get(`user:${userId}:refresh`)
        if (!stored || stored !== refreshToken) {
            throw new UnauthorizedException('Invalid refresh token')
        }

        const payload = { sub: userId }
        const accessToken = this.jwtService.sign(payload)

        return { access_token: accessToken }
    }

    async logout(userId: number) {
        await this.redisService.del(`user:${userId}:refresh`)
    }
}

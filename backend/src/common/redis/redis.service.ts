import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client: Redis

    constructor(private configService: ConfigService) {}

    onModuleInit() {
        this.client = new Redis({
            port: Number(this.configService.get<string>('REDIS_PORT') ?? 6379),
            host: this.configService.get<string>('REDIS_HOST') ?? 'localhost',
            password: this.configService.get<string>('REDIS_PASSWORD') ?? void 0,
            db: Number(this.configService.get<string>('REDIS_DB') ?? 0),
        })
    }

    onModuleDestroy() {
        if (this.client) {
            this.client.quit()
        }
    }

    async set(key: string, value: string, expireSeconds?: number) {
        if (expireSeconds) {
            await this.client.set(key, value, 'EX', expireSeconds)
        } else {
            await this.client.set(key, value)
        }
    }

    async get(key: string): Promise<string | null> {
        return this.client.get(key)
    }

    async del(key: string) {
        await this.client.del(key)
    }
}

import { Controller, Get, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiOperation, ApiResponse, ApiTags, ApiNotFoundResponse } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users.' })
    async findAll() {
        const users = await this.usersService.findAll()
        return users.map((user) => {
            const { password: _, ...userWithoutPassword } = user
            return userWithoutPassword
        })
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single user by id' })
    @ApiResponse({ status: 200, description: 'Return a single user.' })
    @ApiNotFoundResponse({ description: 'User not found.' })
    async findOne(@Param('id') id: string) {
        const { password: _, ...userWithoutPassword } = await this.usersService.findById(+id)
        return userWithoutPassword
    }

    @Get('username/:username')
    @ApiOperation({ summary: 'Get a user by username' })
    @ApiResponse({ status: 200, description: 'Return a user by username.' })
    @ApiNotFoundResponse({ description: 'User not found.' })
    async findByUsername(@Param('username') username: string) {
        const { password: _, ...userWithoutPassword } = await this.usersService.findByUsername(username)
        return userWithoutPassword
    }
}

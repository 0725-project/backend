import { Controller, Get, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiOperation, ApiResponse, ApiTags, ApiNotFoundResponse } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/id/:id')
    @ApiOperation({ summary: 'Get a single user by id' })
    @ApiResponse({ status: 200, description: 'Return a single user.' })
    @ApiNotFoundResponse({ description: 'User not found.' })
    findOne(@Param('id') id: string) {
        return this.usersService.findById(parseInt(id, 10))
    }

    @Get(':username')
    @ApiOperation({ summary: 'Get a user by username' })
    @ApiResponse({ status: 200, description: 'Return a user by username.' })
    @ApiNotFoundResponse({ description: 'User not found.' })
    findByUsername(@Param('username') username: string) {
        return this.usersService.findByUsername(username)
    }
}

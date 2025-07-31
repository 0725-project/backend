import { Controller, Get, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiOperation, ApiResponse, ApiTags, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { IdDto, UsernameDto } from 'src/common/types/default.dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/id/:id')
    @ApiOperation({ summary: 'Get a single user by id' })
    @ApiResponse({ status: 200, description: 'Return a single user.' })
    @ApiNotFoundResponse({ description: 'User not found.' })
    @ApiBadRequestResponse({ description: 'Invalid ID.' })
    findOne(@Param() { id }: IdDto) {
        return this.usersService.findById(id)
    }

    @Get('/username/:username')
    @ApiOperation({ summary: 'Get a user by username' })
    @ApiResponse({ status: 200, description: 'Return a user by username.' })
    @ApiNotFoundResponse({ description: 'User not found.' })
    findByUsername(@Param() { username }: UsernameDto) {
        return this.usersService.findByUsername(username)
    }
}

import { Controller, Get, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiOperation, ApiResponse, ApiTags, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { IdDto } from 'src/common/dto/base'

import { UserResponseDto } from './dto/response.dto'
import { UsernameDto } from './dto/base.dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/id/:id')
    @ApiOperation({ summary: 'Get a single user by id' })
    @ApiResponse({ status: 200, description: 'Return a single user.', type: UserResponseDto })
    @ApiNotFoundResponse({ description: 'User not found.' })
    @ApiBadRequestResponse({ description: 'Invalid ID.' })
    findOne(@Param() { id }: IdDto): Promise<UserResponseDto> {
        return this.usersService.findById(id)
    }

    @Get('/username/:username')
    @ApiOperation({ summary: 'Get a user by username' })
    @ApiResponse({ status: 200, description: 'Return a user by username.', type: UserResponseDto })
    @ApiNotFoundResponse({ description: 'User not found.' })
    findByUsername(@Param() { username }: UsernameDto): Promise<UserResponseDto> {
        return this.usersService.findByUsername(username)
    }
}

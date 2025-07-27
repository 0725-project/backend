import { Body, Controller, Post, BadRequestException, ConflictException } from '@nestjs/common'
import { AuthService } from './auth.service'
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiConflictResponse,
} from '@nestjs/swagger'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Login successful, returns JWT token.' })
    @ApiUnauthorizedResponse({ description: 'Invalid username or password.' })
    @ApiBadRequestResponse({ description: 'Request payload is invalid.' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.username, loginDto.password)
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registration successful.' })
    @ApiBadRequestResponse({ description: 'Username or password is missing or invalid.' })
    @ApiConflictResponse({ description: 'Username already exists.' })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto.username, registerDto.password)
    }
}

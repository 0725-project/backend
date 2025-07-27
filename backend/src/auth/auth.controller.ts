import { Body, Controller, Post, BadRequestException, Res, Req, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiBody,
} from '@nestjs/swagger'
import { REFRESH_TOKEN_EXPIRES_IN_SECONDS } from '../common/constants'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { Request, Response } from 'express'
import { JwtService } from '@nestjs/jwt'

// 응답 DTO 정의 (파일 분리 권장, 여기선 간단히 내부에 정의)
class LoginResponseDto {
    access_token: string
    user_id: number
}
class RefreshResponseDto {
    access_token: string
}
class LogoutResponseDto {
    message: string
}

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
    ) {}

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 201, description: 'Login successful, returns JWT token.', type: LoginResponseDto })
    @ApiUnauthorizedResponse({ description: 'Invalid username or password.', schema: { example: { statusCode: 401, message: 'Invalid username or password.', error: 'Unauthorized' } } })
    @ApiBadRequestResponse({ description: 'Request payload is invalid.', schema: { example: { statusCode: 400, message: 'Username and password are required', error: 'Bad Request' } } })
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<LoginResponseDto> {
        const result = await this.authService.login(loginDto.username, loginDto.password)
        res.cookie('refresh_token', result.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: REFRESH_TOKEN_EXPIRES_IN_SECONDS,
        })
        return { access_token: result.access_token, user_id: result.user_id }
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: 'User registration successful.' })
    @ApiBadRequestResponse({ description: 'Username or password is missing or invalid.', schema: { example: { statusCode: 400, message: 'Username and password are required', error: 'Bad Request' } } })
    @ApiConflictResponse({ description: 'Username already exists.', schema: { example: { statusCode: 409, message: 'Username already exists', error: 'Conflict' } } })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto.username, registerDto.password)
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Re-issue access token using refresh token' })
    @ApiResponse({ status: 200, description: 'Returns new access token.', type: RefreshResponseDto })
    @ApiBadRequestResponse({ description: 'Refresh token is required', schema: { example: { statusCode: 400, message: 'Refresh token is required', error: 'Bad Request' } } })
    @ApiUnauthorizedResponse({ description: 'Invalid refresh token', schema: { example: { statusCode: 401, message: 'Invalid refresh token', error: 'Unauthorized' } } })
    async refresh(@Req() req: Request): Promise<RefreshResponseDto> {
        const userId = this.extractUserIdFromRefreshToken(req)
        if (typeof userId !== 'number') {
            throw new UnauthorizedException('Invalid refresh token')
        }
        const refreshToken = req.cookies?.refresh_token
        return this.authService.refresh(userId, refreshToken)
    }

    @Post('logout')
    @ApiOperation({ summary: 'Logout and remove refresh token' })
    @ApiResponse({ status: 200, description: 'Logout successful.', type: LogoutResponseDto })
    @ApiBadRequestResponse({ description: 'Refresh token is required', schema: { example: { statusCode: 400, message: 'Refresh token is required', error: 'Bad Request' } } })
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<LogoutResponseDto> {
        const userId = this.extractUserIdFromRefreshToken(req, false)
        if (typeof userId === 'number') {
            await this.authService.logout(userId)
        }
        res.clearCookie('refresh_token')
        return { message: 'Logged out' }
    }

    private extractUserIdFromRefreshToken(req: Request, throwOnInvalid = true): number | undefined {
        const refreshToken = req.cookies?.refresh_token
        if (!refreshToken) {
            if (throwOnInvalid) throw new BadRequestException('Refresh token is required')
            return undefined
        }
        try {
            const payload = this.jwtService.decode(refreshToken) as { sub: number }
            if (typeof payload?.sub !== 'number') throw new Error()
            return payload.sub
        } catch {
            if (throwOnInvalid) throw new UnauthorizedException('Invalid refresh token')
            return undefined
        }
    }
}

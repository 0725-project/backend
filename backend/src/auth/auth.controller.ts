import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() body: { username: string; password: string }) {
        return this.authService.login(body.username, body.password)
    }

    @Post('register')
    @ApiOperation({ summary: '회원가입' })
    @ApiResponse({ status: 201, description: '회원가입 성공' })
    @ApiResponse({ status: 400, description: '입력값 오류' })
    register(@Body() body: RegisterDto) {
        return this.authService.register(body.username, body.password)
    }
}

import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLogin } from '../entities/userlogin.entity';
import { AuthService } from '../services/auth.service';

@ApiTags('Usuario')
@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    async login(@Body() user: UserLogin): Promise<any> {
        return this.authService.login(user);
    }

}
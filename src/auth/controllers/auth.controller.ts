import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserLogin } from '../entities/userlogin.entity';
import { AuthService } from '../services/auth.service';


@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    async login(@Body() user: UserLogin): Promise<any> {
        return this.authService.login(user);
    }

}
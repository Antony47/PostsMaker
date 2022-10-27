import {Controller, Post, UseGuards, Get, Body, Req} from '@nestjs/common';
import {Request} from "express";
import {LocalAuthGuard} from "./passports/local-auth.guard";
import {JwtAuthGuard} from "./passports/jwt-auth.guard";
import {AuthService} from "./auth.service";
import {User, UserPayload} from "../../shared/decorators/user.decorator";



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request) {
        return this.authService.login(req.user);
    }



    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@User() user: UserPayload) {
        return user;
    }
}
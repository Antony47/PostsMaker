import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UserService} from "../users/user.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any>{
        const user = await this.userService.findOne(email);
        if (!user) return null;

        const isValid = await bcrypt.compare(pass, user.password);
        if (!isValid) return null;

        const { password, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { userId: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}

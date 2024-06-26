import { Injectable } from '@nestjs/common';
import { AuthResponse } from './types/auth-response.type';
import { JwtService } from '@nestjs/jwt';
import { AuthInput } from './dto/inputs/auth.input';
import * as bcrypt from 'bcrypt';
import { BadRequestException, ForbiddenException } from '@nestjs/common/exceptions';
import { UsersService } from 'src/Wiki Entities/users/users.service';
import { User } from 'src/Wiki Entities/users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService:UsersService,
        private readonly jwtService:JwtService
    ){}

    private async getToken(
        user: User
    ):Promise<string>{

        delete user.password;
        return await this.jwtService.signAsync({...user});
    }
    
    async signup(
        authInput:AuthInput
    ):Promise<AuthResponse>{

        const user = await this.usersService.create(authInput);   
        const token = await this.getToken(user);
        return {token, user}
    }

    async login(
        authInput:AuthInput
    ):Promise<AuthResponse>{
        
        const user = await this.usersService.findOneByUsername(authInput.username);

        if(!bcrypt.compareSync(authInput.password, user.password))
        {
            throw new BadRequestException(`Username or Password incorrect.`)
        }

        if(!user.isActive)
        {
            throw new ForbiddenException(`User ${user.username} blocked. Please contact with the admin to manage your account.`);
        }

        const token = await this.getToken(user);

        return {token, user};
    }
}

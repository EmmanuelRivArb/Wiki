import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext, ID } from '@nestjs/graphql';
import { Request } from 'express';
import { userInfo } from 'os';
import { UsersService } from 'src/Wiki Entities/users/users.service';
import { Role } from '../enums/role.enum';
import { User } from 'src/Wiki Entities/users/entities/user.entity';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;
    
    if (!user) {
      throw new InternalServerErrorException(`No user inside the request - make sure that we used the AuthGuard`)
    }

    try {
      
      if (!user.roles.includes(Role.Admin)) {

        throw new ForbiddenException(
          `User ${user.email} has not "${Role.Admin}" privileges.`,
        );
      }

    } catch (error) {
      if (error instanceof ForbiddenException) throw error;
      else throw new UnauthorizedException();
    }

    return true;
  }
}
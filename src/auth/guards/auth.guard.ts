import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext, ID } from '@nestjs/graphql';
import { Request } from 'express';
import { userInfo } from 'os';
import { UsersService } from 'src/Wiki Entities/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      //TOKEN
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      //CONSULTA A USER
      const user = await this.usersService.findOne(payload.id);
      if (user.isActive === false) {
        throw new ForbiddenException(
          `User ${user.email} blocked. Please contact with the admin to manage your account.`,
        );
      }
      
      request['user'] = payload;
    } catch (error) {
      if (error instanceof ForbiddenException) throw error;
      else throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

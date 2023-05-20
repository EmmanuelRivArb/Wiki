import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthResolver, AuthService],
  imports:[
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService) =>{
        return{
          secret: configService.get('JWT_SECRET'),
          signOptions:{
            expiresIn: '4h',
          }
        }
      }
    })
  ]
})

export class AuthModule {}
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/Wiki Entities/users/users.module';

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
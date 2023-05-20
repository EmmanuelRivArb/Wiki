import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    JwtModule,
    CommentsModule
  ],
  providers: [UsersResolver, UsersService],
  controllers: [UsersController],
  exports:[
    UsersService,
    TypeOrmModule
  ]
})
export class UsersModule {}


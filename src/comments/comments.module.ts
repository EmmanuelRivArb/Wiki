import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [CommentsResolver, CommentsService],
  imports:[
    TypeOrmModule.forFeature([Comment]),
    ConfigModule,
    JwtModule, 
    forwardRef(() => UsersModule)
  ],
  exports:[
    CommentsService,
    TypeOrmModule
  ]
})
export class CommentsModule {}
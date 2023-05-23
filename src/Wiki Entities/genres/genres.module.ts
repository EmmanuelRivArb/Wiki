import { Module, forwardRef } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresResolver } from './genres.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [GenresResolver, GenresService],
  imports:[
    ConfigModule,
    JwtModule, 
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Genre])
  ],
  exports:[GenresService, TypeOrmModule]
})

export class GenresModule {}

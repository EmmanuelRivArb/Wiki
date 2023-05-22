import { Module, forwardRef } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { GenresModule } from '../genres/genres.module';

@Module({
  providers: [MoviesResolver, MoviesService],
  imports:[
    TypeOrmModule.forFeature([Movie]),
    ConfigModule,
    JwtModule, 
    forwardRef(() => UsersModule),
    GenresModule,
  ]
})
export class MoviesModule {}

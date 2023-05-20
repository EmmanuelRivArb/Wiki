import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MoviesResolver, MoviesService],
  imports:[
    TypeOrmModule.forFeature([Movie])
  ]
})
export class MoviesModule {}

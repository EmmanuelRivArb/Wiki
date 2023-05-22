import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresResolver } from './genres.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';

@Module({
  providers: [GenresResolver, GenresService],
  imports:[
    TypeOrmModule.forFeature([Genre])
  ]
})

export class GenresModule {}

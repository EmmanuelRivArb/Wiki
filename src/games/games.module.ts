import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';

@Module({
  providers: [GamesResolver, GamesService],
  imports:[
    TypeOrmModule.forFeature([Game])
  ]
})

export class GamesModule {}

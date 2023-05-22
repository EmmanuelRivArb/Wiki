import { Module, forwardRef } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { GenresModule } from '../genres/genres.module';

@Module({
  providers: [GamesResolver, GamesService],
  imports:[
    TypeOrmModule.forFeature([Game]),
    ConfigModule,
    JwtModule, 
    forwardRef(() => UsersModule),
    GenresModule,
  ]
})

export class GamesModule {}

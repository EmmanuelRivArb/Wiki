import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from 'src/Wiki Entities/comments/comments.module';
import { UsersModule } from 'src/Wiki Entities/users/users.module';
import { GenresModule } from 'src/Wiki Entities/genres/genres.module';
import { BooksModule } from 'src/Wiki Entities/books/books.module';
import { MoviesModule } from 'src/Wiki Entities/movies/movies.module';
import { GamesModule } from 'src/Wiki Entities/games/games.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ConfigModule, CommentsModule, UsersModule, GenresModule,BooksModule, MoviesModule, GamesModule],
})
export class SeedModule {}

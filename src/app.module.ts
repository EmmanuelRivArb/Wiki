import { Module } from '@nestjs/common';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { RolesModule } from './Wiki Entities/roles/roles.module';
import { GamesModule } from './Wiki Entities/games/games.module';
import { GenresModule } from './Wiki Entities/genres/genres.module';
import { BooksModule } from './Wiki Entities/books/books.module';
import { MoviesModule } from './Wiki Entities/movies/movies.module';
import { UsersModule } from './Wiki Entities/users/users.module';
import { CommentsModule } from './Wiki Entities/comments/comments.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      includeStacktraceInErrorResponses: false,
      cors: {
        origin: '*',
        credentials: true,
      },
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CommentsModule,
    SeedModule,
    RolesModule,
    GamesModule,
    GenresModule,
    BooksModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

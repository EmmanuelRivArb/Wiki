import { Module, forwardRef } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { GenresModule } from '../genres/genres.module';

@Module({
  providers: [BooksResolver, BooksService],
  imports:[
    ConfigModule,
    JwtModule, 
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Book]),
    GenresModule,
  ]
})
export class BooksModule {}

import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [BooksResolver, BooksService],
  imports:[
    TypeOrmModule.forFeature([Book])
  ]
})
export class BooksModule {}

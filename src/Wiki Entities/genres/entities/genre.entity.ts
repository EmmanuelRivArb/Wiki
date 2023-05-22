import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Book } from 'src/Wiki Entities/books/entities/book.entity';
import { Game } from 'src/Wiki Entities/games/entities/game.entity';
import { Movie } from 'src/Wiki Entities/movies/entities/movie.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'genres' })
@ObjectType()

export class Genre {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;


  @Column({unique:true})
  @Field(() => String)
  name: string;
  

  @OneToMany(() => Game, (game) => game.genre, {lazy:true, onDelete:'CASCADE'})
  @Field(() => [Game])
  games: Game[];

  @OneToMany(() => Book, (book) => book.genre, {lazy:true, onDelete:'CASCADE'})
  @Field(() => [Book])
  books: Book[];

  @OneToMany(() => Movie, (movie) => movie.genre, {lazy:true, onDelete:'CASCADE'})
  @Field(() => [Movie])
  movies: Movie[];
}
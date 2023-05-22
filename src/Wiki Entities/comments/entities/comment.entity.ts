import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Book } from 'src/Wiki Entities/books/entities/book.entity';
import { Movie } from 'src/Wiki Entities/movies/entities/movie.entity';
import { Game } from 'src/Wiki Entities/games/entities/game.entity';



@Entity({ name: 'comments' })
@ObjectType()
export class Comment {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;


  @Column({nullable:true})
  @Field(() => String, {nullable:true})
  value: string;

  
  @ManyToOne(() => User, (user) => user.comments, {lazy:true, nullable:false, onDelete:'CASCADE'})
  @Field(() => User)
  user: User;
  /*
  @ManyToOne(() => Book, (book) => book.comments, {lazy:true, nullable:true, onDelete:'CASCADE'})
  @Field(() => Book)
  book: Book;

  @ManyToOne(() => Movie, (movie) => movie.comments, {lazy:true, nullable:true, onDelete:'CASCADE'})
  @Field(() => Movie)
  movie: Movie;

  @ManyToOne(() => Game, (game) => game.comments, {lazy:true, nullable:true, onDelete:'CASCADE'})
  @Field(() => Game)
  game: Game; */

}

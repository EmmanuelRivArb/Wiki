import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Genre } from 'src/genres/entities/genre.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movies' })
@ObjectType()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String) 
  title: string;

  @Column()
  @Field(() => String) 
  director: string;

  @Column()
  @Field(() => Int) 
  duration: number;

  @Column()
  @Field(() => Float) 
  price: number;

  @Column()
  @Field(() => String) 
  image: string;

  @Column()
  @Field(() => String) 
  description: string;

  @ManyToOne(() => Genre, (x) => x.movies, {lazy:true, nullable:false, onDelete:'CASCADE'})
  @Field(() => Genre)
  genre: Genre;
}

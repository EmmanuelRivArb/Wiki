import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Genre } from 'src/Wiki Entities/genres/entities/genre.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String) 
  title: string;

  @Column()
  @Field(() => String) 
  author: string;

  @Column()
  @Field(() => Float) 
  price: number;

  @Column()
  @Field(() => String) 
  image: string;

  @Column()
  @Field(() => String) 
  description: string;

  @ManyToOne(() => Genre, (x) => x.books, {lazy:true, nullable:false, onDelete:'CASCADE'})
  @Field(() => Genre)
  genre: Genre;
}

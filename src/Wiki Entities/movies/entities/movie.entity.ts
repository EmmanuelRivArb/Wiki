import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Genre } from 'src/Wiki Entities/genres/entities/genre.entity';
import { Product } from 'src/Wiki Entities/products/product.class';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/Wiki Entities/comments/entities/comment.entity';

@Entity({ name: 'movies' })
@ObjectType()

export class Movie extends Product {
  
  @Column()
  @Field(() => String) 
  director: string;

  @Column()
  @Field(() => Int) 
  duration: number;

  @ManyToOne(() => Genre, (genre) => genre.movies, {lazy:true, nullable:false, onDelete:'CASCADE'})
  @Field(() => Genre)
  genre: Genre;

  @OneToMany(() => Comment, (comment) => comment.movie, {lazy:true, onDelete:'CASCADE'})
  @Field(() => [Comment])
  comments: Comment[];
}

import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Genre } from 'src/Wiki Entities/genres/entities/genre.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/Wiki Entities/comments/entities/comment.entity';
import { Product } from 'src/Wiki Entities/products/product.class';

@Entity({ name: 'books' })
@ObjectType()
export class Book extends Product{
 
  @Column()
  @Field(() => String) 
  author: string;


  @ManyToOne(() => Genre, (x) => x.books, {lazy:true, nullable:false, onDelete:'CASCADE'})
  @Field(() => Genre)
  genre: Genre;

  @OneToMany(() => Comment, (comment) => comment.product, {lazy:true, onDelete:'CASCADE'})
  @Field(() => [Comment])
  comments: Comment[];

}

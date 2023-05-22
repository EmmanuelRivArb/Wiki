import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Genre } from 'src/Wiki Entities/genres/entities/genre.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/Wiki Entities/comments/entities/comment.entity';
import { Product } from 'src/Wiki Entities/products/product.class';

@Entity({ name: 'books' })
@ObjectType()
export class Book extends Product{
 
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({nullable:true, default:"No disponible"})
  @Field(() => String, {nullable:true}) 
  author: string;

  @Column({unique:true})
  @Field(() => String) 
  title: string;

  @Column({nullable:true})
  @Field(() => Float) 
  price: number;

  @Column({nullable:true})
  @Field(() => String) 
  image: string;

  @Column({nullable:true})
  @Field(() => String) 
  description: string;

  @ManyToOne(() => Genre, (genre) => genre.books, {lazy:true, nullable:false, onDelete:'CASCADE'})
  @Field(() => Genre)
  genre: Genre;

  @OneToMany(() => Comment, (comment) => comment.id, {lazy:true, onDelete:'CASCADE'})
  @Field(() => [Comment])
  comments: Comment[];
}

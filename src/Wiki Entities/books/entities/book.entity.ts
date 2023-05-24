import { ObjectType, Field, Int, ID, Float, InputType } from '@nestjs/graphql';
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

  @Column({type:'float8', nullable:true})
  @Field(() => Float, {nullable:true}) 
  price: number;

  @Column({nullable:true})
  @Field(() => String, {nullable:true}) 
  image: string;

  @Column({nullable:true})
  @Field(() => String, {nullable:true}) 
  description: string;

  @ManyToOne(() => Genre, (genre) => genre.books, {lazy:true, nullable:false, onDelete:'CASCADE'})
  @Field(() => Genre)
  genre: Genre;

  @OneToMany(() => Comment, (comment) => comment.book, {lazy:true, onDelete:'CASCADE'})
  @Field(() => [Comment])
  comments: Comment[];

}

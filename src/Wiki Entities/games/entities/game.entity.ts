import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Genre } from 'src/Wiki Entities/genres/entities/genre.entity';
import { Product } from 'src/Wiki Entities/products/product.class';
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/Wiki Entities/comments/entities/comment.entity';

@Entity({ name: 'games' })
@ObjectType()
export class Game extends Product {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
 
  @Column()
  @Field(() => String) 
  developers: string;

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


  @ManyToOne(() => Genre, (genre) => genre.games, {lazy:true, nullable:false, onDelete:'CASCADE'})
  @Field(() => Genre)
  genre: Genre;
  
  
  @OneToMany(() => Comment, (comment) => comment.id, {lazy:true, onDelete:'CASCADE'})
  @Field(() => [Comment])
  comments: Comment[];

  @Column({type: String, array:true})
  @Field(() => [String])
  columnIds: string[];
}

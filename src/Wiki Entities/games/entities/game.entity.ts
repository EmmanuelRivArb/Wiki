import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Genre } from 'src/Wiki Entities/genres/entities/genre.entity';
import { Product } from 'src/Wiki Entities/products/product.class';
import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { Comment } from 'src/Wiki Entities/comments/entities/comment.entity';


@Entity({ name: 'games' })
@ObjectType()
export class Game extends Product {

 
  @Column()
  @Field(() => String) 
  developers: string;


  @ManyToOne(() => Genre, (x) => x.games, {lazy:true, nullable:false, onDelete:'CASCADE'})
  @Field(() => Genre)
  genre: Genre;

  @OneToMany(() => Comment, (comment) => comment.product, {lazy:true, onDelete:'CASCADE'})
  @Field(() => [Comment])
  comments: Comment[];

}

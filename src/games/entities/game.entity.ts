import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'games' })
@ObjectType()
export class Game {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String) 
  title: string;

  @Column()
  @Field(() => Float) 
  price: number;

  @Column()
  @Field(() => String) 
  developers: string;

  @Column()
  @Field(() => String) 
  image: string;

  @Column()
  @Field(() => String) 
  description: string;

  //temporal
  @Column()
  @Field(() => String)
  genre: string;
}

import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Genre } from 'src/genres/entities/genre.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Genre, (x) => x.games, {lazy:true, nullable:false, onDelete:'CASCADE'})
  @Field(() => Genre)
  genre: Genre;
}

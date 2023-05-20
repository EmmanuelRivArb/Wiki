import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Game } from 'src/games/entities/game.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'genres' })
@ObjectType()
export class Genre {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;


  @Column()
  @Field(() => String)
  name: string;
  

  @OneToMany(() => Game, (x) => x.genre, {lazy:true, onDelete:'CASCADE'})
  @Field(() => [Game])
  games: Game[];
}
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Comment } from '../../comments/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({name:'users'})
@ObjectType()
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({unique:true})
  @Field(() => String)
  username: string;

  @Column({
    /*transformer:{
      from: (value) => value, to: (value) => {return bcrypt.hash(value,10)}
    }*/
    transformer:{
      from: value => value,
      to: (value:string) => { return bcrypt.hashSync(value, 10)}
    }
  })
  password: string;

  @Column({
    type:Boolean,
    default:true,
  })
  @Field(() => Boolean)
  isActive: boolean;

  @OneToMany(() => Comment, (comment) => comment.user, {lazy:true, onDelete:'CASCADE'})
  @Field(() => [Comment])
  comments: Comment[];
}
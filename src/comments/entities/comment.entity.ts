import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';



@Entity({ name: 'comments' })
@ObjectType()
export class Comment {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;


  @Column()
  @Field(() => String)
  value: string;

  
  @ManyToOne(() => User, (user) => user.comments, {lazy:true, nullable:false, onDelete:'CASCADE'})
  @Field(() => User)
  user: User;
}

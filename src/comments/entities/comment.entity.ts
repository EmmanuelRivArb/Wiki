import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { StringifyOptions } from 'querystring';
import { text } from 'stream/consumers';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Prioridad } from '../enums/priority.enum';


//registerEnumType(enum, {})
registerEnumType(Prioridad, {name: 'Prioridad'} );

@Entity({name:'comments'})
@ObjectType()
export class Comment {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id:string;

  @Column({unique:true})
  @Field(() => String)
  title: string;
  
  @Column({
    //type:'enum',
    type: 'enum',
    enum: Prioridad,
  })

  @Field(() => Prioridad)
  priority: string;

  @Column({nullable:true})
  @Field(() => String, {nullable:true})
  description: string;

  @Column({
    type: Boolean,
    default:true
  })
  @Field(() => Boolean)
  isActive: boolean;
  
  @ManyToOne(() => User, (user) => user.comments, {lazy:true, nullable:false, onDelete:'CASCADE'})
  @Field(() => User)
  user:User
}

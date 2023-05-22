import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "../comments/entities/comment.entity";

ObjectType()
export abstract class Product{

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

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

}
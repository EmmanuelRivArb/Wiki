import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { Column, PrimaryGeneratedColumn } from "typeorm";


export abstract class Product{

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
  image: string;

  @Column()
  @Field(() => String) 
  description: string;

}
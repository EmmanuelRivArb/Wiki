import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class UserOutput {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;
}
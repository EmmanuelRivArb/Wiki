import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class LoginInput {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Field(() => String, {nullable:true})
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Field(() => String, {nullable:true})
    password: string;

}
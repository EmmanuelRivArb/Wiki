import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, MinLength } from "class-validator";

@InputType()
export class AuthInput {

    @IsString()
    @Field(() => String)
    username:string;

    @MinLength(6)
    @Field(() => String)
    password:string;
}
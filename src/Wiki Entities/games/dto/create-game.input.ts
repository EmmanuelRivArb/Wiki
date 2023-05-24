import { InputType, Field, Float } from '@nestjs/graphql';
import { IsDecimal, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateGameInput {
  
  @IsNotEmpty()
  @IsString()
  @Field(() => String, {nullable:true}) 
  developers: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String) 
  title: string;


  @IsNumber()
  @IsDecimal()
  @IsPositive()
  @Field(() => Float, {nullable:true}) 
  price: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, {nullable:true})
  image: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, {nullable:true})
  description: string;
}

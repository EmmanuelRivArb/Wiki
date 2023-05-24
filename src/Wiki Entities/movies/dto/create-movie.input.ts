import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDecimal, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateMovieInput {
  
  @IsNotEmpty()
  @IsString()
  @Field(() => String) 
  title: string;
  
  @IsNotEmpty()
  @IsString()
  @Field(() => String, {nullable:true})
  director: string;
  
  @IsNumber()
  @IsDecimal()
  @IsPositive()
  @Field(() => Int, {nullable:true}) 
  duration: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, {nullable:true})
  image: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, {nullable:true})
  description: string;

}

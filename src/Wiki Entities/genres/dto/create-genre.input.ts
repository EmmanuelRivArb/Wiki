import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateGenreInput {
  
  @IsNotEmpty()
  @IsString()
  @Field(() => String) 
  name: string;
  
}

import { IsUUID } from 'class-validator';
import { CreateGenreInput } from './create-genre.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGenreInput extends PartialType(CreateGenreInput) {
  
  @IsUUID()
  @Field(() => String)
  id: string;
}

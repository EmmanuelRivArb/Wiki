import { IsUUID } from 'class-validator';
import { CreateBookInput } from './create-book.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  
  @IsUUID()
  @Field(() => String)
  id: string;
}

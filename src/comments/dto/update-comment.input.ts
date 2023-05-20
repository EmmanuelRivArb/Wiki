import { CreateCommentInput } from './create-comment.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsBoolean, IsUUID, NotEquals } from 'class-validator';
import { IsNull } from 'typeorm';

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  
  @IsUUID()
  @Field(() => ID)
  id: string;

}

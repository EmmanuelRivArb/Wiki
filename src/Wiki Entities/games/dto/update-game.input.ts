import { IsUUID } from 'class-validator';
import { CreateGameInput } from './create-game.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  
  @IsUUID()
  @Field(() => String)
  id: string;
}

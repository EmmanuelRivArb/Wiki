import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string;
}

import { InputType, Int, Field } from '@nestjs/graphql';
import { notEqual } from 'assert';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  NotEquals,
  ValidateIf,
} from 'class-validator';
import { IsNull } from 'typeorm';

@InputType()
export class CreateCommentInput {
  
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  value: string;
}

import { InputType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {

  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsEmail()
  @Field(() => String, {nullable:true})
  email?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Field(() => String, {nullable:true})
  name?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Field(() => String, {nullable:true})
  surname?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsOptional()
  @Field(() => String, {nullable:true})
  password?: string;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {nullable:true})
  isActive?: boolean;

}
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/Wiki Entities/users/entities/user.entity';

@ObjectType()
export class AuthResponse
{
    @Field(() => String)
    token:string;

    @Field(() => User)
    user:User
}
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AdminRoleGuard } from 'src/auth/guards/adminRole.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserOutput } from './dto/outputs/user.output';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @UseGuards(AdminRoleGuard)
  @Query(() => [User], { name: 'showUsers' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @UseGuards(AdminRoleGuard)
  @Query(() => User, { name: 'showUser' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
  
  @Query(() => [UserOutput], { name: 'showUsersEmail' })
  findAllEmails(): Promise<any>{
    return this.usersService.findAllUserEmail();
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User, { name: 'updateUser' })
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user:User
  ): Promise<User> {
    return this.usersService.update(updateUserInput, user);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreateCommentInput } from '../comments/dto/create-comment.input';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Game)
@UseGuards(AuthGuard)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Mutation(() => Game)
  createGame(
    @Args('createGameInput') createGameInput: CreateGameInput,
    @Args('genreName', {type:() => String}) genreName:string
    ) {
    return this.gamesService.create(createGameInput, genreName);
  }

  @Query(() => [Game], { name: 'games' })
  findAll() {
    return this.gamesService.findAll();
  }

  @Query(() => Game, { name: 'game' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.gamesService.findOne(id);
  }

  @Mutation(() => Game)
  updateGame(@Args('updateGameInput') updateGameInput: UpdateGameInput) {
    return this.gamesService.update(updateGameInput.id, updateGameInput);
  }

  @Mutation(() => Game)
  removeGame(@Args('id', { type: () => String }) id: string) {
    return this.gamesService.remove(id);
  }

  @Mutation(() => Game)
  createGameComment(
    @Args('id', { type: () => String }) id: string,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user: User,
  ) {
    return this.gamesService.createGameComment(id, createCommentInput, user);
  }
}

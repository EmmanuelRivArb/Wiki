import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { CreateCommentInput } from '../comments/dto/create-comment.input';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { AdminRoleGuard } from 'src/auth/guards/adminRole.guard';

@Resolver(() => Movie)
@UseGuards(AuthGuard)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AdminRoleGuard)
  @Mutation(() => Movie)
  createMovie(
    @Args('createMovieInput') createMovieInput: CreateMovieInput,
    @Args('genreName', {type:() => String}) genreName:string
    ) {
    return this.moviesService.create(createMovieInput, genreName);
  }

  @Query(() => [Movie], { name: 'movies' })
  findAll() {
    return this.moviesService.findAll();
  }

  @Query(() => Movie, { name: 'movie' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.moviesService.findOne(id);
  }

  @UseGuards(AdminRoleGuard)
  @Mutation(() => Movie)
  updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.moviesService.update(updateMovieInput.id, updateMovieInput);
  }

  @UseGuards(AdminRoleGuard)
  @Mutation(() => Boolean)
  removeMovie(@Args('id', { type: () => String }) id: string) {
    return this.moviesService.remove(id);
  }

  @Mutation(() => Movie)
  createMovieComment(
    @Args('id', { type: () => String }) id: string,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user: User,
  ) 
  {
    return this.moviesService.createMovieComment(id, createCommentInput, user);
  }
}


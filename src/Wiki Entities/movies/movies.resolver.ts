import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { CreateCommentInput } from '../comments/dto/create-comment.input';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

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

  @Mutation(() => Movie)
  updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.moviesService.update(updateMovieInput.id, updateMovieInput);
  }

  @Mutation(() => Movie)
  removeMovie(@Args('id', { type: () => String }) id: string) {
    return this.moviesService.remove(id);
  }

  @Mutation(() => Movie)
  createMovieComment(
    @Args('id', { type: () => String }) id: string,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user: User,
  ) {
    return this.moviesService.createMovieComment(id, createCommentInput, user);
  }
}


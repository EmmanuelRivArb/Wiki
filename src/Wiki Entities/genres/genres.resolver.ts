import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GenresService } from './genres.service';
import { Genre } from './entities/genre.entity';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Genre)
//@UseGuards(AuthGuard)
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Mutation(() => Genre)
  createGenre(@Args('createGenreInput') createGenreInput: CreateGenreInput) {
    return this.genresService.create(createGenreInput);
  }

  @Query(() => [Genre], { name: 'genres' })
  findAll() {
    return this.genresService.findAll();
  }

  @Query(() => Genre, { name: 'genre' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.genresService.findOne(id);
  }

  @Query(() => Genre, { name: 'genreByName' })
  findOneByName(@Args('name', { type: () => String }) name: string) {
    return this.genresService.findOneByName(name);
  }

  @Mutation(() => Genre)
  updateGenre(@Args('updateGenreInput') updateGenreInput: UpdateGenreInput) {
    return this.genresService.update(updateGenreInput.id, updateGenreInput);
  }

  @Mutation(() => Boolean)
  removeGenre(@Args('id', { type: () => String }) id: string) {
    return this.genresService.remove(id);
  }
}

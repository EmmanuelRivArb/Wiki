import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GenresService } from './genres.service';
import { Genre } from './entities/genre.entity';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { UseGuards } from '@nestjs/common';
import { AdminRoleGuard } from 'src/auth/guards/adminRole.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Resolver(() => Genre)
@UseGuards(AuthGuard)
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @UseGuards(AdminRoleGuard)
  @Mutation(() => Genre)
  createGenre(@Args('createGenreInput') createGenreInput: CreateGenreInput) {
    return this.genresService.create(createGenreInput);
  }

  @UseGuards(AdminRoleGuard)
  @Query(() => [Genre], { name: 'genres' })
  findAll() {
    return this.genresService.findAll();
  }

  @UseGuards(AdminRoleGuard)
  @Query(() => Genre, { name: 'genre' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.genresService.findOne(id);
  }

  @UseGuards(AdminRoleGuard)
  @Query(() => Genre, { name: 'genreByName' })
  findOneByName(@Args('name', { type: () => String }) name: string) {
    return this.genresService.findOneByName(name);
  }

  @UseGuards(AdminRoleGuard)
  @Mutation(() => Genre)
  updateGenre(@Args('updateGenreInput') updateGenreInput: UpdateGenreInput) {
    return this.genresService.update(updateGenreInput.id, updateGenreInput);
  }

  @UseGuards(AdminRoleGuard)
  @Mutation(() => Boolean)
  removeGenre(@Args('id', { type: () => String }) id: string) {
    return this.genresService.remove(id);
  }
}

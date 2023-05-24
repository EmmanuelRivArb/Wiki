import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreateCommentInput } from '../comments/dto/create-comment.input';
import { AdminRoleGuard } from 'src/auth/guards/adminRole.guard';

@Resolver(() => Book)
@UseGuards(AuthGuard)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AdminRoleGuard)
  @Mutation(() => Book)
  async createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
    @Args('genreName', {type:() => String}) genreName:string
  )
  {
    return await this.booksService.create(createBookInput, genreName);
  }

  @Query(() => [Book], { name: 'books' })
  async findAll() {
    return await this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.booksService.findOne(id);
  }

  @UseGuards(AdminRoleGuard)
  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(updateBookInput.id, updateBookInput);
  }

  @UseGuards(AdminRoleGuard)
  @Mutation(() => Boolean)
  removeBook(@Args('id', { type: () => String }) id: string) {
    return this.booksService.remove(id);
  }

  @Mutation(() => Book)
  createBookComment(
    @Args('id', { type: () => String }) id: string,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user: User,
  ) {
    return this.booksService.createBookComment(id, createCommentInput, user);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => Comment)
@UseGuards(AuthGuard)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  createBookComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @Args('book_id', { type: () => String }, ParseUUIDPipe) book_id: string,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.createBookComment(createCommentInput, book_id, user);
  }

  @Mutation(() => Comment)
  createGameComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @Args('game_id', { type: () => String }, ParseUUIDPipe) game_id: string,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.createGameComment(createCommentInput, game_id, user);
  }


  @Mutation(() => Comment)
  createMovieComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @Args('book_id', { type: () => String }, ParseUUIDPipe) movie_id: string,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.createMovieComment(createCommentInput, movie_id, user);
  }

  @Query(() => [Comment], { name: 'comments' })
  async findAll(@CurrentUser() user: User): Promise<Comment[]> {
    return await this.commentsService.findAll(user);
  }

  @Query(() => Comment, { name: 'comment' })
  async findOne(
    @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<Comment> {
    return await this.commentsService.findOne(id, user);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
    @CurrentUser() user: User,
  ): Promise<Comment> {
    return this.commentsService.update(updateCommentInput, user);
  }

  @Mutation(() => Boolean)
  removeComment(
    @Args('id') comment_id: string,
    @CurrentUser() user: User,
  ): Promise<Boolean> {
    return this.commentsService.remove(comment_id, user);
  }

}

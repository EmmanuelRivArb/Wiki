import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';


@Injectable()
export class CommentsService {
  
  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

  ) {}

  async createBookComment(
    createCommentInput: CreateCommentInput,
    book_id: string,
    user: User,
  ): Promise<Comment> {
    try {

      const comment = await this.commentRepository.create({
        ...createCommentInput,
        book:{id:book_id},
        user,
      });

      return await this.commentRepository.save(comment);
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async createGameComment(
    createCommentInput: CreateCommentInput,
    game_id: string,
    user: User,
  ): Promise<Comment> {
    try {

      const comment = await this.commentRepository.create({
        ...createCommentInput,
        game:{id:game_id},
        user,
      });
      return await this.commentRepository.save(comment);
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async createMovieComment(
    createCommentInput: CreateCommentInput,
    movie_id: string,
    user: User,
  ): Promise<Comment> {
    try {

      const comment = await this.commentRepository.create({
        ...createCommentInput,
        movie:{id:movie_id},
        user,
      });
      return await this.commentRepository.save(comment);
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async findAll(user: User): Promise<Comment[]> {
    return await this.commentRepository.findBy({
      user: {
        id: user.id,
      },
    });
  }

  async findOne(id: string, user: User): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({
      id,
      user: {
        id: user.id,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id:${id} not found`);
    }

    return comment;
  }

  async update(
    updateCommentInput: UpdateCommentInput,
    user: User,
  ): Promise<Comment> {
    try {
      const comment = await this.findOne(updateCommentInput.id, user);
      const updateComment = await this.commentRepository.preload({
        ...updateCommentInput,
        user,
      });

      if (!updateComment) {
        throw new NotFoundException(
          `Comment with id:${updateComment.id} not found`,
        );
      }

      return await this.commentRepository.save(updateComment);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else this.handlerDBError(error);
    }
  }

  async remove(
    comment_id: string,
    user: User,
  ): Promise<Boolean> {
    try {
      const comment = await this.findOne(comment_id, user);
      const updateComment = await this.commentRepository.remove(comment);
      return true
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else this.handlerDBError(error);
    }
  }

  private handlerDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException('Please check logs...');
  }
}

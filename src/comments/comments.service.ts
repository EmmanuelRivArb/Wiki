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
import { ID } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { IsUUID } from 'class-validator';

@Injectable()
export class CommentsService {
  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(
    createCommentInput: CreateCommentInput,
    user: User,
  ): Promise<Comment> {
    try {
      const comment = await this.commentRepository.create({
        ...createCommentInput,
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

  async block(id: string, user: User): Promise<Comment> {
    const comment = await this.findOne(id, user);
    comment.isActive = false;
    return await this.commentRepository.save(comment);
  }

  async blockComments(user: User): Promise<Comment[]> {
    const comments: Comment[] = await this.findAll(user);
    comments.forEach(async (comment) => {
      comment.isActive = false;
      await this.commentRepository.save(comment);
    });
    return comments;
  }

  async commentCountByUser(user: User): Promise<number> {
    return this.commentRepository.count({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  async commentActiveCountByUser(user: User): Promise<number> {
    return this.commentRepository.count({
      where: {
        isActive: true,
        user: {
          id: user.id,
        },
      },
    });
  }

  async commentBlockedCountByUser(user: User): Promise<number> {
    return this.commentRepository.count({
      where: {
        isActive: false,
        user: {
          id: user.id,
        },
      },
    });
  }

  private handlerDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException('Please check logs...');
  }
}

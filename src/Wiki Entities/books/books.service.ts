import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { User } from '../users/entities/user.entity';
import { GenresService } from '../genres/genres.service';
import { CreateCommentInput } from '../comments/dto/create-comment.input';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/entities/comment.entity';

@Injectable()
export class BooksService {

  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly genresService:GenresService,
    private readonly commentsService:CommentsService
  ) {}

  async create(createBookInput: CreateBookInput, genreName:string) {
    try {

      const genre = await this.genresService.findOneByName(genreName)
      const book = await this.bookRepository.create({
        ...createBookInput,
        genre,
      });
      
      return await this.bookRepository.save(book); 
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async findAll() {
    //return await this.bookRepository.createQueryBuilder().relation('Comment')

    return await this.bookRepository.find({
      relations:{
        comments:true,
      }
    });
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOneBy({id});

    if (!book) {
      throw new NotFoundException(`Book with id:${id} not found`);
    }

    return book;
  }

  async update(id: string, updateBookInput: UpdateBookInput) {
    try {
      const book = await this.findOne(id);
      const updateBook = await this.bookRepository.preload({
        ...updateBookInput,
      });

      if (!updateBook) {
        throw new NotFoundException(
          `Book with id:${id} not found`,
        );
      }

      return await this.bookRepository.save(updateBook);
    } 
    catch (error) {
      if (error instanceof NotFoundException) throw error;
      else this.handlerDBError(error);
    }
  }

  async remove(id: string) {
    const genre = await this.findOne(id);
    await this.bookRepository.remove(genre);
    return true;
  }

  async createBookComment(id:string, createCommentInput:CreateCommentInput, user:User)
  {
    const comment = await this.commentsService.createBookComment(createCommentInput, id, user)
    return await this.findOne(id);
  }

  private handlerDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException('Please check logs...');
  }
}

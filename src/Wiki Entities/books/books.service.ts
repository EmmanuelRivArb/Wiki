import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BooksService {

  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookInput: CreateBookInput, user: User) {
    try {
      const book = await this.bookRepository.create({
        ...createBookInput,
      });
      return await this.bookRepository.save(book);
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: string) {
    return `This action returns a #${id} book`;
  }

  update(id: string, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: string) {
    return `This action removes a #${id} book`;
  }

  private handlerDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException('Please check logs...');
  }
}

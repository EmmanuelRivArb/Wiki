import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { User } from '../users/entities/user.entity';
import { GenresService } from '../genres/genres.service';

@Injectable()
export class BooksService {

  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly genresService:GenresService
  ) {}

  async create(createBookInput: CreateBookInput, genreName:string) {
    try {

      const genre = await this.genresService.findOneByName(genreName)
      const book = await this.bookRepository.create({
        ...createBookInput,
        genre
      });
      
      return await this.bookRepository.save(book); 
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async findAll() {
    return await this.bookRepository.find();
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

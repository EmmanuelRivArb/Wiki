import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  
  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(createGenreInput: CreateGenreInput):Promise<Genre> 
  {
    try {
      const genre = this.genreRepository.create({
        ...createGenreInput,
        movies:[],
        books:[],
        games:[],
      });
      return await this.genreRepository.save(genre);
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async findAll() {
    return await this.genreRepository.find();
  }

  async findOne(id: string) {
    const genre = await this.genreRepository.findOneBy({id});

    if (!genre) {
      throw new NotFoundException(`Genre with id:${id} not found`);
    }

    return genre;
  }

  async findOneByName(genreName: string) {
    let genre = await this.genreRepository.findOneBy({name:genreName});

    if (!genre) {
      /* genre = await this.create({name:genreName}); */
      throw new NotFoundException(
        `Genre with name:${genreName} not found`,
      );
    }
    
    return genre;
  }

  async update(id: string, updateGenreInput: UpdateGenreInput) {
    try {
      const genre = await this.findOne(id);
      const updateGenre = await this.genreRepository.preload({
        ...updateGenreInput,
      });

      if (!updateGenre) {
        throw new NotFoundException(
          `Genre with id:${updateGenre.id} not found`,
        );
      }

      return await this.genreRepository.save(updateGenre);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else this.handlerDBError(error);
    }
  }

  async remove(id: string) {
    const genre = await this.findOne(id);
    await this.genreRepository.remove(genre);
    return true;
  }

  private handlerDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException('Please check logs...');
  }
}

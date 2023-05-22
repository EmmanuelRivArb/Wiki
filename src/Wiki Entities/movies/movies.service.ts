import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenresService } from '../genres/genres.service';

@Injectable()
export class MoviesService {

  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly genresService:GenresService
  ) {}

  async create(createMovieInput: CreateMovieInput, genreName:string
    ) {
    try {

      const genre = await this.genresService.findOneByName(genreName)
      const movie = await this.movieRepository.create({
        ...createMovieInput,
        genre
      });
      
      return await this.movieRepository.save(movie); 
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async findAll() {
    //return await this.movieRepository.createQueryBuilder().relation('Comment')
    return await this.movieRepository.find();
  }

  async findOne(id: string) {
    const movie = await this.movieRepository.findOneBy({id});

    if (!movie) {
      throw new NotFoundException(`Genre with id:${id} not found`);
    }

    return movie;
  }

  async update(id: string, updateMovieInput: UpdateMovieInput) {
    try {
      const movie = await this.findOne(id);
      const updateMovie = await this.movieRepository.preload({
        ...updateMovieInput,
      });

      if (!updateMovie) {
        throw new NotFoundException(
          `Movie with id:${id} not found`,
        );
      }

      return await this.movieRepository.save(updateMovie);
    } 
    catch (error) {
      if (error instanceof NotFoundException) throw error;
      else this.handlerDBError(error);
    }
  }

  async remove(id: string) {
    const genre = await this.findOne(id);
    await this.movieRepository.remove(genre);
    return true;
  }

  private handlerDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException('Please check logs...');
  }
}
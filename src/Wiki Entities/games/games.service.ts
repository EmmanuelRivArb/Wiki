import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenresService } from '../genres/genres.service';

@Injectable()
export class GamesService {

  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly genresService:GenresService
  ) {}

  async create(createGameInput: CreateGameInput, genreName:string
    ) {
    try {

      const genre = await this.genresService.findOneByName(genreName)
      const game = await this.gameRepository.create({
        ...createGameInput,
        genre
      });
      
      return await this.gameRepository.save(game); 
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async findAll() {
    //return await this.gameRepository.createQueryBuilder().relation('Comment')
    return await this.gameRepository.find({
      relations:{
        comments:true
      }
    });
  }

  async findOne(id: string) {
    const game = await this.gameRepository.findOneBy({id});

    if (!game) {
      throw new NotFoundException(`Genre with id:${id} not found`);
    }

    return game;
  }

  async update(id: string, updateGameInput: UpdateGameInput) {
    try {
      const game = await this.findOne(id);
      const updateGame = await this.gameRepository.preload({
        ...updateGameInput,
      });

      if (!updateGame) {
        throw new NotFoundException(
          `Game with id:${id} not found`,
        );
      }

      return await this.gameRepository.save(updateGame);
    } 
    catch (error) {
      if (error instanceof NotFoundException) throw error;
      else this.handlerDBError(error);
    }
  }

  async remove(id: string) {
    const genre = await this.findOne(id);
    await this.gameRepository.remove(genre);
    return true;
  }

  private handlerDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException('Please check logs...');
  }
}

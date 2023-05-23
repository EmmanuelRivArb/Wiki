import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(Role)
    private readonly gameRepository: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput) {
    try {
      const game = await this.gameRepository.create({
        ...createRoleInput,
      });

      return await this.gameRepository.save(game);
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async findAll() {
    return await this.gameRepository.find({
      relations: {
        users: true,
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} role`;
  }

  update(id: string, updateRoleInput: UpdateRoleInput) {
    return `This action updates a #${id} role`;
  }

  remove(id: string) {
    return `This action removes a #${id} role`;
  }

  private handlerDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException('Please check logs...');
  }
}

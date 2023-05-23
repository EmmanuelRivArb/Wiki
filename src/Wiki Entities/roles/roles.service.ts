import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
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
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput) {
    try {
      const role = await this.roleRepository.create({
        ...createRoleInput,
      });

      return await this.roleRepository.save(role);
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async findAll() {
    return await this.roleRepository.find({
      relations: {
        users: true,
      },
    });
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOneBy({ id });

    if (!role) {
      throw new NotFoundException(`Genre with id:${id} not found`);
    }

    return role;
  }

  async findOneByName(rolName: string) {
    const role = await this.roleRepository.findOneBy({ name: rolName });

    if (!role) {
      throw new NotFoundException(`Rol with name:${rolName} not found`);
    }

    return role;
  }

  async update(id: string, updateRoleInput: UpdateRoleInput) {
    try {
      const role = await this.findOne(id);
      const updateRole = await this.roleRepository.preload({
        ...updateRoleInput,
      });

      if (!updateRole) {
        throw new NotFoundException(`Role with id:${id} not found`);
      }

      return await this.roleRepository.save(updateRole);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else this.handlerDBError(error);
    }
  }

  async remove(id: string) {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
    return true;
  }

  private handlerDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException('Please check logs...');
  }
}

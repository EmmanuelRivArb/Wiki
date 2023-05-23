import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthInput } from 'src/auth/dto/inputs/auth.input';
import { RolesService } from '../roles/roles.service';
import { ID } from '@nestjs/graphql';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(authInput: AuthInput, roleName: string = 'user'): Promise<User> {
    try {
      const role = await this.rolesService.findOneByName(roleName);
      const user = this.userRepository.create({
        ...authInput,
        // password: bcrypt.hashSync(authInput.password, 10)
      });
      user.roles = [role];
      return await this.userRepository.save(user);
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException(`User with id:${id} not found`);
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
      relations: {
        roles: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with username:${username} not found`);
    }

    return user;
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    try {
      /*let user;
      if(updateUserInput.password)
        user = await this.userRepository.preload({...updateUserInput, password:bcrypt.hashSync(updateUserInput.password, 10)});
      else
        user = await this.userRepository.preload(updateUserInput);*/

      const user = await this.userRepository.preload(updateUserInput);

      if (!user) {
        throw new NotFoundException(
          `User with id:${updateUserInput.id} not found`,
        );
      }

      return await this.userRepository.save(user);
    } catch (error) {
      this.handlerDBError(error);
    }
  }
  /*
  async block(
    id: string
  ):Promise<User> {

    const user = await this.findOne(id)
    const comments = await this.commentsService.blockComments(user);
    user.isActive = false;
    return this.userRepository.save(user);

  }
*/
  async remove(id: string): Promise<Boolean> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return true;
  }

  private handlerDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException('Pls check logs...');
  }
}

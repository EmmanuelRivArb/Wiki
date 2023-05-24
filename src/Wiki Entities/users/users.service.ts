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
import { ID } from '@nestjs/graphql';
import { Role } from 'src/auth/enums/role.enum';
import { userInfo } from 'os';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(authInput: AuthInput, roleName: Role = Role.User): Promise<User> {
    try {
      const user = this.userRepository.create({
        ...authInput,
        roles:[roleName]
      });

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

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({email});

    if (!user) {
      throw new NotFoundException(`User with username:${email} not found`);
    }

    return user;
  }

  async update(updateUserInput: UpdateUserInput, currentUser:User): Promise<User> {
    try {
      /*let user;
      if(updateUserInput.password)
        user = await this.userRepository.preload({...updateUserInput, password:bcrypt.hashSync(updateUserInput.password, 10)});
      else
        user = await this.userRepository.preload(updateUserInput);*/
      if(!(currentUser.roles.includes(Role.Admin)&&updateUserInput.isActive))
      {
        if(updateUserInput.id != currentUser.id)
        {
          throw new BadRequestException(`You can't change the user:${updateUserInput.id} params. It is not your profile`)
        }
      } 
      const user = await this.userRepository.preload(updateUserInput);
      delete user.password

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

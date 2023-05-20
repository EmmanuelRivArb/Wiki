import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../comments/entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CommentsService } from '../comments/comments.service';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { SEED_USERS, SEED_COMMENTS } from './data/seed-data';

@Injectable()
export class SeedService {

    private isProd: boolean;
    constructor(

        private readonly configService:ConfigService,

        private readonly commentsService:CommentsService,

        private readonly UsersService:UsersService,
        
        @InjectRepository(User)
        private readonly usersRepository: Repository<Comment>,
    ){
        this.isProd = this.configService.get('STATE') === 'prod';
    }

    async executeSeed():Promise<Boolean>{

        if(this.isProd)
            throw new ForbiddenException(`Imposible to execute seeder in production stage.`)

        await this.deleteDataBase();
        await this.createDataBase();

        return true
    }


    async deleteDataBase(){

        this.usersRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute();
    }

    async createDataBase(){

        const users = await this.loadUsers();
        const comments = await this.loadComments(users);
    }

    async loadUsers():Promise<User[]>{
        
        const users:User[] = [];

        for (const user of SEED_USERS) {

            users.push( await this.UsersService.create(user));
        }

        return users;
    }

    async loadComments(users:User[]):Promise<Comment[]>{

        const comments: Comment[] = [];
        let pos = 0;
        for (const comment of SEED_COMMENTS) {
            
            if(pos === users.length)
            {
                pos = 0;
            }

            comments.push(await this.commentsService.create(comment, users[pos]));
            pos++;
        }
        
        return comments;
    }
}
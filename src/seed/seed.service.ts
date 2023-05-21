import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { CommentsService } from 'src/Wiki Entities/comments/comments.service';
import { User } from 'src/Wiki Entities/users/entities/user.entity';
import { SEED_COMMENTS, SEED_USERS } from './data/seed-data';
import { UsersService } from 'src/Wiki Entities/users/users.service';
import { Comment } from 'src/Wiki Entities/comments/entities/comment.entity';

@Injectable()
export class SeedService {

    private isProd: boolean;
    constructor(

        private readonly configService: ConfigService,

        private readonly commentsService: CommentsService,

        private readonly usersService: UsersService,
        
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

            users.push( await this.usersService.create(user));
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
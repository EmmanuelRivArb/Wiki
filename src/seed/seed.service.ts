import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { CommentsService } from 'src/Wiki Entities/comments/comments.service';
import { User } from 'src/Wiki Entities/users/entities/user.entity';
import { SEED_ADMINS, SEED_USERS } from './data/seed-data';
import { UsersService } from 'src/Wiki Entities/users/users.service';
import { Comment } from 'src/Wiki Entities/comments/entities/comment.entity';
import { Role } from 'src/auth/enums/role.enum';
import { Book } from 'src/Wiki Entities/books/entities/book.entity';
import { Game } from 'src/Wiki Entities/games/entities/game.entity';
import { Movie } from 'src/Wiki Entities/movies/entities/movie.entity';
import { Genre } from 'src/Wiki Entities/genres/entities/genre.entity';
import { BooksService } from 'src/Wiki Entities/books/books.service';
import { MoviesService } from 'src/Wiki Entities/movies/movies.service';
import { GamesService } from 'src/Wiki Entities/games/games.service';
import { GenresService } from 'src/Wiki Entities/genres/genres.service';


@Injectable()
export class SeedService {

    private isProd: boolean;
    constructor(

        private readonly configService: ConfigService,

        private readonly commentsService: CommentsService,
        private readonly booksService: BooksService,
        private readonly moviesService: MoviesService,
        private readonly gamesService: GamesService,
        private readonly genresService: GenresService,
        private readonly usersService: UsersService,
        
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>,
        @InjectRepository(Book)
        private readonly booksRepository: Repository<Book>,
        @InjectRepository(Game)
        private readonly gamesRepository: Repository<Game>,
        @InjectRepository(Movie)
        private readonly moviesRepository: Repository<Movie>,
        @InjectRepository(Genre)
        private readonly genresRepository: Repository<Genre>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
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

        this.commentsRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute();

        this.booksRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute();

        this.gamesRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute();

        this.moviesRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute();

        this.genresRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute();

        this.usersRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute();

    }

    async createDataBase(){

        const users = await this.loadUsers();
        //const comments = await this.loadComments(users);
    }

    async loadUsers():Promise<User[]>{
        
        const users:User[] = [];

        for (const user of SEED_USERS) {

            users.push( await this.usersService.create(user));
        }

        for(const user of SEED_ADMINS){

            users.push(await this.usersService.create(user,Role.Admin))
        }
        return users;
    }

    /*async loadComments(users:User[]):Promise<Comment[]>{

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
    }*/
}
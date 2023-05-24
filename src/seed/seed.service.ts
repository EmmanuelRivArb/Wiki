import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { CommentsService } from 'src/Wiki Entities/comments/comments.service';
import { User } from 'src/Wiki Entities/users/entities/user.entity';
import { SEED_ADMINS, SEED_BOOKS, SEED_COMMENTS, SEED_GAMES, SEED_GENRES, SEED_MOVIES, SEED_USERS } from './data/seed-data';
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
        const admins = await this.loadAdmins();
        const genres = await this.loadGenres();
        const books = await this.loadBooks(genres);
        const games = await this.loadGames(genres);
        const movies = await this.loadMovies(genres);
        const comments = await this.loadComments(books,games,movies,users);
        //const comments = await this.loadComments(users);
    }

    async loadUsers():Promise<User[]>{
        
        const users:User[] = [];

        for (const user of SEED_USERS) {

            users.push( await this.usersService.create(user));
        }

        return users;
    }

    async loadAdmins():Promise<User[]>{
        
        const admins:User[] = [];

        for(const user of SEED_ADMINS){

            admins.push(await this.usersService.create(user,Role.Admin))
        }
        return admins;
    }

    async loadGenres():Promise<Genre[]>{

        const genres: Genre[] = [];
        for (const genre of SEED_GENRES) {
            genres.push(await this.genresService.create(genre));
        }
        
        return genres;
    }

    async loadBooks(genres:Genre[]):Promise<Book[]>{

        const books: Book[] = [];
        const inputBooks = []
        for (const book of SEED_BOOKS) {
            
            inputBooks.push(book)
        }
        
        books.push(await this.booksService.create(inputBooks[0], genres[0].name));
        books.push(await this.booksService.create(inputBooks[1], genres[1].name));
        books.push(await this.booksService.create(inputBooks[2], genres[2].name));
        books.push(await this.booksService.create(inputBooks[3], genres[3].name));
        books.push(await this.booksService.create(inputBooks[4], genres[4].name));
        books.push(await this.booksService.create(inputBooks[5], genres[1].name));
        books.push(await this.booksService.create(inputBooks[6], genres[6].name));
        books.push(await this.booksService.create(inputBooks[7], genres[2].name));


        return books;
    }

    async loadGames(genres:Genre[]):Promise<Game[]>{

        const games: Game[] = [];
        const inputGames = []
        for (const game of SEED_GAMES) {
            
            inputGames.push(game)
        }
        
        games.push(await this.gamesService.create(inputGames[0], genres[5].name));
        games.push(await this.gamesService.create(inputGames[1], genres[6].name));
        games.push(await this.gamesService.create(inputGames[2], genres[7].name));
        games.push(await this.gamesService.create(inputGames[3], genres[8].name));
        games.push(await this.gamesService.create(inputGames[4], genres[9].name));

        return games;
    }


    async loadMovies(genres:Genre[]):Promise<Movie[]>{

        const movies: Movie[] = [];
        const inputMovies = []
        for (const movie of SEED_MOVIES) {
            
            inputMovies.push(movie)
        }
        
        movies.push(await this.moviesService.create(inputMovies[0], genres[0].name));
        movies.push(await this.moviesService.create(inputMovies[1], genres[10].name));
        movies.push(await this.moviesService.create(inputMovies[2], genres[0].name));
        movies.push(await this.moviesService.create(inputMovies[3], genres[0].name));
        movies.push(await this.moviesService.create(inputMovies[4], genres[11].name));
        movies.push(await this.moviesService.create(inputMovies[5], genres[4].name));

        return movies;
    }

    async loadComments(books:Book[], games:Game[], movies:Movie[],users:User[]):Promise<Comment[]>{

        const comments: Comment[] = [];
        const inputComments = []
        for (const comment of SEED_COMMENTS ) {
            
            inputComments.push(comment)
        }

        comments.push(await this.commentsService.createBookComment(inputComments[0], books[0].id, users[0]));
        comments.push(await this.commentsService.createBookComment(inputComments[1], books[0].id, users[1]));
        comments.push(await this.commentsService.createGameComment(inputComments[2], games[2].id, users[2]));
        comments.push(await this.commentsService.createGameComment(inputComments[3], games[2].id, users[3]));
        comments.push(await this.commentsService.createMovieComment(inputComments[4], movies[3].id, users[0]));
        
        return comments;
    }
}
import { Controller, Delete, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

    constructor(
        private readonly usersService:UsersService
    ){}

    @Delete(':id')
    async removeUser(@Param('id', ParseUUIDPipe) id:string){
        return await this.usersService.remove(id);
    }

}

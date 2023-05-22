import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from 'src/Wiki Entities/comments/comments.module';
import { UsersModule } from 'src/Wiki Entities/users/users.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ConfigModule, CommentsModule, UsersModule],
})
export class SeedModule {}

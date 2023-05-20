import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { CommentsModule } from '../comments/comments.module';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ConfigModule, CommentsModule, UsersModule],
})
export class SeedModule {}

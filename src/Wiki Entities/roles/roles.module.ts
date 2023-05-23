import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  providers: [RolesResolver, RolesService],
  imports: [TypeOrmModule.forFeature([Role]), ConfigModule, JwtModule],
})
export class RolesModule {}

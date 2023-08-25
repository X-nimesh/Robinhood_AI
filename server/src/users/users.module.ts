import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersEntity } from './models/users.entity';
import { PortfolioEntity } from 'src/portfolio/model/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, PortfolioEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

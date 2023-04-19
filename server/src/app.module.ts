import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig()),
    AuthModule,
    UsersModule,
    PortfolioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

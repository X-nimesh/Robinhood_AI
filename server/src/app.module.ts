import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ScrapperModule } from './scrapper/scrapper.module';
import { StockPriceModule } from './stock-price/stock-price.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig()),
    CacheModule.register({
      host: 'localhost',
      port: 6379,
      ttl: 500, // seconds
      max: 10, // maximum number of items in cache
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    PortfolioModule,
    ScrapperModule,
    StockPriceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

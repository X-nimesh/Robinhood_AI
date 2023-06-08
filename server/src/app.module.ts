import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ScrapperModule } from './scrapper/scrapper.module';
import { StockPriceModule } from './stock-price/stock-price.module';
import { redisStore } from 'cache-manager-redis-store';
import { ReduxSetupModule } from './redis-setup/redis-setup.module';
import { ReduxService } from './redis-setup/redis.service';
import { ConfigService } from '@nestjs/config';
import { PredictModule } from './predict/predict.module';
import { join } from 'path';
import { glob } from 'glob';

@Module({
  imports: [
    ReduxSetupModule,
    TypeOrmModule.forRoot(typeOrmConfig()),
    AuthModule,
    UsersModule,
    PortfolioModule,
    ScrapperModule,
    StockPriceModule,
    PredictModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

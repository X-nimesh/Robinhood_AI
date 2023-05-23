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
import { ReduxSetupModule } from './redux-setup/redux-setup.module';
import { ReduxService } from './redux-setup/redux.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ReduxSetupModule,
    TypeOrmModule.forRoot(typeOrmConfig()),
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

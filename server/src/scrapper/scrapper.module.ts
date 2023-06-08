import { CacheStore, Module } from '@nestjs/common';
import { ScrapperController } from './controller/scrapper.controller';
import { ScrapperService } from './services/scrapper.service';
import { PuppeteerModule } from 'nest-puppeteer';
import { ReduxService } from 'src/redis-setup/redis.service';
import { ReduxSetupModule } from 'src/redis-setup/redis-setup.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    ReduxSetupModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore as unknown as CacheStore,
        host: 'localhost',
        port: 6379,
        ttl: 500,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ScrapperController],
  providers: [ScrapperService, ReduxService],
})
export class ScrapperModule {}

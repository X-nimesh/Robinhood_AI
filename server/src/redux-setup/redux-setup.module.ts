import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { ReduxService } from './redux.service';

@Module({
  imports: [
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
  providers: [ReduxService],
  exports: [ReduxService],
})
export class ReduxSetupModule {}

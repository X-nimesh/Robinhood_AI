import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ReduxService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async get(key: string): Promise<any> {
    const data = await this.cacheManager.get(key);
    return data;
  }
  set(key: string, data: any) {
    return this.cacheManager.set(key, data);
  }
}

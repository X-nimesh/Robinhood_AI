import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ReduxService } from './redux-setup/redux.service';

@Injectable()
export class AppService {
  //   constructor(
  //     // @Inject(CACHE_MANAGER) private cacheManager: Cache
  //     // private readonly cacheManager: ReduxService,
  //   ) {}

  async getHello(): Promise<any> {
    // const key = 'mykey';
    // const data = await this.cacheManager.get(key);
    // console.log('data', data);
    // if (data) {
    //   return data;
    // }
    // await this.cacheManager.set(key, { name: 'Nimessh' });
    return { name: 'Nimesh' };
  }
}

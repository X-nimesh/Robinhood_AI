import { Injectable } from '@nestjs/common';
import { StocksRepo } from './stocks.repo';
import fetch from 'node-fetch';

@Injectable()
export class StocksService {
  constructor(private readonly stockRepo: StocksRepo) {}
  async getAllStocks() {
    // const data = await fetch(
    //   `https://nepsealpha.com/trading/1/search?limit=500`,
    // );
    // const json = await data.json();
    // return json;
    return this.stockRepo.getAll();
  }
}

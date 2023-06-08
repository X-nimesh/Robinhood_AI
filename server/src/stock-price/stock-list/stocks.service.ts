import { Injectable } from '@nestjs/common';
import { StocksRepo } from './stocks.repo';

@Injectable()
export class StocksService {
  constructor(private readonly stockRepo: StocksRepo) {}
  async getAllStocks() {
    return this.stockRepo.getAll();
  }
}

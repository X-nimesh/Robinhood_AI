import { Injectable } from '@nestjs/common';
import { StocksRepo } from './stocks.repo';
import fetch from 'node-fetch';
import axios from 'axios';

@Injectable()
export class StocksService {
  constructor(private readonly stockRepo: StocksRepo) {}
  async getAllStocks() {
    // const data = await axios.get(`https://nepsealpha.com/trading/1/search`);
    // return data;
    // // const json = await data.json();
    // // console.log(json);
    // // return json;
    return this.stockRepo.getAll();
  }
  async getOneStock(id: number) {
    return this.stockRepo.getOnebyId(id);
  }
}

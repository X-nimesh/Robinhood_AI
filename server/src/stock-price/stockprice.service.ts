import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as CircularJSON from 'circular-json';
@Injectable()
export class StockpriceService {
  token = 'chhkbr1r01qqda6905l0chhkbr1r01qqda6905lg';
  async getAllStocks() {
    const symbols = await axios.get(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US&mic=XNYS&token=${this.token}`,
    );
    const serializedData = CircularJSON.stringify(symbols.data);
    const parsedData = CircularJSON.parse(serializedData);
    const len = parsedData.length;
    console.log(len);

    // console.log(parsedData);
    const finalStocks = parsedData.slice(len / 1.1, len - 1);
    return finalStocks;
  }

  async searchStocks(query: string) {
    console.log(query);
    console.log(
      `https://finnhub.io/api/v1/search?q=${query}&token=${this.token}`,
    );
    const symbols = await axios.get(
      `https://finnhub.io/api/v1/search?q=${query}&token=${this.token}`,
    );
    return symbols.data;
  }
}

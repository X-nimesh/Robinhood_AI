import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PortfolioService {
  constructor(private readonly httpService: HttpService) {}
  async getPrices() {
    return 'price';
  }
}

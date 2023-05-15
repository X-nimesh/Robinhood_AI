import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioStocksEntity } from '../model/portfolioStocks.entity';
import { PortfolioEntity } from '../model/portfolio.entity';

@Injectable()
export class PortfolioRepo {
  constructor(
    @InjectRepository(PortfolioEntity)
    private portfolioEnity: Repository<PortfolioEntity>,

    @InjectRepository(PortfolioStocksEntity)
    private portfolioStockEnity: Repository<PortfolioStocksEntity>,
  ) {}
  async getPortfolioByID(uid: string) {
    const uidNum = parseInt(uid);
    return this.portfolioEnity.findBy({ userId: uidNum });
  }
  async getPortfolioDetByID(pid: number) {
    return this.portfolioStockEnity.findBy({
      portfolioID: pid,
    });
  }
}

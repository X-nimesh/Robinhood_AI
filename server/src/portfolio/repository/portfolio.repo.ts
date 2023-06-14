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
  async addStock(
    portfolioID,
    stockID,
    quantity,
    purchase_price,
    purchase_date,
  ) {
    const date = new Date();
    const created = this.portfolioStockEnity.create({
      portfolioID,
      stockID,
      quantity,
      purchase_price,
      purchase_date,
      created_at: date,
      updated_at: date,
    });

    return this.portfolioStockEnity.save(created);
  }
}

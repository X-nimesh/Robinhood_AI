import { Repository } from 'typeorm';
import { StocksEntity } from './stocks.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class StocksRepo {
  constructor(
    @InjectRepository(StocksEntity)
    private readonly stocksentity: Repository<StocksEntity>,
  ) {}
  async getAll() {
    return this.stocksentity.find();
  }
}

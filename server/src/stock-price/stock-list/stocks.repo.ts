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
  async getOnebyId(id: number): Promise<StocksEntity> {
    return this.stocksentity.findOne({
      where: { id },
      select: ['stockName', 'symbol', 'id', 'totalShares', 'Sector'],
    });

    const query = `select st.id as "id",st.stock_name as "stockName", st.stock_symbol as "symbol", st.total_shares as "totalshares", sec.sector_name as "sectorName" from
    stocks st inner join
    sector sec on st.sector_id = sec.id where st.id=$1;`;

    return this.stocksentity.query(query, [id]);
  }
}

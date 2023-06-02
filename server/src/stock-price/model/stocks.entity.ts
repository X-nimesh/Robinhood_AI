import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SectorEntity } from './sectors.entity';

@Entity({ name: 'stocks' })
export class StocksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stock_name' })
  stockName: string;

  @Column({ name: 'stock_symbol' })
  symbol: string;

  @Column({ name: 'sector_id' })
  Sector: number;

  @ManyToOne(() => SectorEntity, (sector) => sector.id)
  @JoinColumn({ name: 'sector_id' })
  sector: SectorEntity;

  @Column({ name: 'total_shares' })
  totalShares: number;
}

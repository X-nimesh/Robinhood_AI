import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StocksEntity } from '../stock-list/stocks.entity';

@Entity({ name: 'sector' })
export class SectorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //   @OneToMany(() => StocksEntity, (stock) => stock.Sector)
  //   stock: StocksEntity[];

  @Column({ name: 'sector_name' })
  Sector: string;

  @Column({ name: 'details' })
  details: string;
}

import { Firma } from '../firma/firma.entity';
import { Pdv } from '../pdv/pdv.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Artikl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  naziv: string;

  @Column()
  jm: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cijena: number;

  @Column()
  active: boolean;

  @Column({ name: 'pdv_id' })
  pdvId: number;

  @ManyToOne(() => Pdv)
  @JoinColumn({ name: 'pdv_id' })
  pdv: Pdv;

  @Column({ name: 'firma_id' })
  firmaId: number;

  @ManyToOne(() => Firma)
  @JoinColumn({ name: 'firma_id' })
  firma: Firma;

  @Column()
  timestamp: string;
}

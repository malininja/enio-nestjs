import { Firma } from '../firma/firma.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pdv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  naziv: string;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  stopa: number;

  @Column({ name: 'firma_id' })
  firmaId: number;

  @ManyToOne(() => Firma)
  @JoinColumn({ name: 'firma_id' })
  firma: Firma;

  @Column()
  timestamp: string;
}

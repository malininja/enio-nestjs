import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Firma } from '../firma/firma.entity';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  adresa?: string;

  @Column({ nullable: true })
  mjesto?: string;

  @Column()
  naziv: string;

  @Column({ nullable: true })
  oib?: string;

  @Column({ nullable: true })
  posta?: string;

  @Column()
  valuta: number;

  @Column()
  active: boolean;

  @Column({ name: 'firma_id' })
  firmaId: number;

  @ManyToOne(() => Firma)
  @JoinColumn({ name: 'firma_id' })
  firma: Firma;

  @Column()
  timestamp: string;
}

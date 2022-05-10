import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Firma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'aktivna_godina' })
  aktivnaGodina: number;

  @Column({ nullable: true })
  adresa: string;

  @Column({ nullable: true })
  mjesto: string;

  @Column()
  naziv: string;

  @Column({ length: 11 })
  oib: string;

  @Column({ nullable: true })
  zr: string;

  @Column()
  timestamp: string;
}

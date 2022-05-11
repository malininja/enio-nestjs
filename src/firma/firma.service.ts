import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FirmaDto } from './dto/firma.dto';
import { Firma } from './firma.entity';

@Injectable()
export class FirmaService {
  constructor(
    @InjectRepository(Firma) private firmaRepository: Repository<Firma>,
  ) {}

  get(id: number): Promise<Firma> {
    return this.firmaRepository.findOne({ where: { id } });
  }

  async save(id: number, firmaDto: FirmaDto): Promise<Firma> {
    const { naziv, adresa, mjesto, oib, zr, timestamp } = firmaDto;

    const result = await this.firmaRepository.update(
      { id, timestamp },
      {
        naziv,
        adresa,
        mjesto,
        oib,
        zr,
        timestamp: new Date().getTime().toString(),
      },
    );

    if (result.affected === 0) throw new Error('Entity is not updated');

    return this.get(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JqGridFilter, JqGridQueryDto } from '../common/jq-grid';
import { parseDecimal } from 'src/common/parsers';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PdvDto } from './pdv.dto';
import { Pdv } from './pdv.entity';
import {
  generateTimestamp,
  createJqGridQuery,
  createGetCountQuery,
} from 'src/common/database';

@Injectable()
export class PdvService {
  constructor(@InjectRepository(Pdv) private pdvRepository: Repository<Pdv>) {}

  get(firmaId: number, pdvId: number): Promise<Pdv> {
    return this.pdvRepository.findOne({
      where: { id: pdvId, firmaId },
    });
  }

  getAll(firmaId: number, jqGridQueryDto: JqGridQueryDto): Promise<Pdv[]> {
    const query = this.pdvRepository.createQueryBuilder('pdv');
    createJqGridQuery(query, 'pdv', firmaId, jqGridQueryDto, this.addFilters);
    return query.getMany();
  }

  getCount(firmaId: number, jqGridQueryDto: JqGridQueryDto): Promise<number> {
    const query = this.pdvRepository.createQueryBuilder('pdv');
    createGetCountQuery(query, firmaId, jqGridQueryDto, this.addFilters);
    return query.getCount();
  }

  async save(firmaId: number, pdvDto: PdvDto): Promise<Pdv> {
    const { id, naziv, stopa: stopaString, timestamp } = pdvDto;
    const stopa = parseDecimal(stopaString);

    if (!id) {
      const pdv = this.pdvRepository.create({
        naziv,
        stopa,
        firmaId,
        timestamp: generateTimestamp(),
      });

      return this.pdvRepository.save(pdv);
    }

    const result = await this.pdvRepository.update(
      { id, firmaId, timestamp },
      { naziv, stopa, timestamp: generateTimestamp() },
    );

    if (!result.affected) return null;
    return this.get(firmaId, id);
  }

  private addFilters(
    filter: JqGridFilter,
    query: SelectQueryBuilder<Pdv>,
  ): void {
    filter.rules.forEach((rule) => {
      const { field, data } = rule;

      switch (field) {
        case 'naziv':
          query.andWhere(`pdv.naziv like :naziv`, { naziv: `${data}%` });
          break;
        case 'stopa':
          query.andWhere(`pdv.stopa=:stopa`, { stopa: parseInt(data) });
          break;
      }
    });
  }
}

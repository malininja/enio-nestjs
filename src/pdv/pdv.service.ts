import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getJqGridFilters,
  getPagingData,
  getSortData,
  JqGridFilter,
  JqGridQueryDto,
} from 'src/common/jqGrid';
import { parseDecimal } from 'src/common/parsers';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PdvDto } from './dto/pdv.dto';
import { Pdv } from './pdv.entity';

@Injectable()
export class PdvService {
  constructor(@InjectRepository(Pdv) private pdvRepository: Repository<Pdv>) {}

  get(firmaId: number, pdvId: number): Promise<Pdv> {
    return this.pdvRepository.findOne({
      where: { firmaId, id: pdvId },
    });
  }

  getAll(firmaId: number, jqGridQueryDto: JqGridQueryDto): Promise<Pdv[]> {
    const { pageSize, offset } = getPagingData(jqGridQueryDto);
    const sortData = getSortData(jqGridQueryDto);
    const filter = getJqGridFilters(jqGridQueryDto);

    const query = this.pdvRepository.createQueryBuilder('pdv');
    query.where({ firmaId });

    if (filter) {
      this.addFilters(filter, query);
    }

    if (sortData) {
      const { field, order } = sortData;
      query.orderBy(`pdv.${field}`, order);
    }

    query.skip(offset);
    query.take(pageSize);

    return query.getMany();
  }

  getCount(firmaId: number, jqGridQueryDto: JqGridQueryDto): Promise<number> {
    const filter = getJqGridFilters(jqGridQueryDto);

    const query = this.pdvRepository.createQueryBuilder('pdv');
    query.where({ firmaId });

    if (filter) {
      this.addFilters(filter, query);
    }

    return query.getCount();
  }

  async save(firmaId: number, pdvDto: PdvDto): Promise<Pdv> {
    const { id, naziv, stopa: stopaString, timestamp } = pdvDto;
    const stopa = parseDecimal(stopaString);
    console.log('id', id);

    if (!id) {
      const pdv = this.pdvRepository.create({
        naziv,
        stopa,
        firmaId,
        timestamp: new Date().getTime().toString(),
      });

      return this.pdvRepository.save(pdv);
    }

    const result = await this.pdvRepository.update(
      { id, firmaId, timestamp },
      { naziv, stopa },
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

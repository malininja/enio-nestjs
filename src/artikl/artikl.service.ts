import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createGetCountQuery,
  createJqGridQuery,
  generateTimestamp,
} from 'src/common/database';
import { JqGridFilter, JqGridQueryDto } from 'src/common/jq-grid';
import { parseBool, parseDecimal } from 'src/common/parsers';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ArtiklDto } from './artikl.dto';
import { Artikl } from './artikl.entity';

@Injectable()
export class ArtiklService {
  constructor(
    @InjectRepository(Artikl) private artiklRepository: Repository<Artikl>,
  ) {}

  get(firmaId: number, artiklId: number): Promise<Artikl> {
    return this.artiklRepository.findOne({
      where: { id: artiklId, firmaId },
      relations: ['pdv'],
    });
  }

  async getAll(
    firmaId: number,
    jqGridQueryDto: JqGridQueryDto,
  ): Promise<Artikl[]> {
    const query = this.artiklRepository.createQueryBuilder('artikl');

    createJqGridQuery(
      query,
      'artikl',
      firmaId,
      jqGridQueryDto,
      this.addFilters,
    );

    return query.innerJoinAndSelect('artikl.pdv', 'pdv').getMany();
  }

  getCount(firmaId: number, jqGridQueryDto: JqGridQueryDto): Promise<number> {
    const query = this.artiklRepository.createQueryBuilder('artikl');
    createGetCountQuery(query, firmaId, jqGridQueryDto, this.addFilters);
    return query.innerJoin('artikl.pdv', 'pdv').getCount();
  }

  async save(firmaId: number, artiklDto: ArtiklDto): Promise<Artikl> {
    const {
      id,
      naziv,
      jm,
      pdv,
      cijena: cijenaString,
      active,
      timestamp,
    } = artiklDto;

    const cijena = parseDecimal(cijenaString);

    if (!id) {
      const artikl = this.artiklRepository.create({
        firmaId,
        naziv,
        jm,
        pdvId: pdv.id,
        cijena,
        active: true,
        timestamp: generateTimestamp(),
      });

      return this.artiklRepository.save(artikl);
    }

    const result = await this.artiklRepository.update(
      { id, firmaId, timestamp },
      {
        naziv,
        jm,
        pdvId: pdv.id,
        cijena,
        active,
        timestamp: generateTimestamp(),
      },
    );

    if (!result.affected) return null;
    return this.get(firmaId, id);
  }

  private addFilters(
    filter: JqGridFilter,
    query: SelectQueryBuilder<Artikl>,
  ): void {
    filter.rules.forEach((rule) => {
      const { field, data } = rule;
      switch (field) {
        case 'naziv':
          query.andWhere(`artikl.naziv like :naziv`, { naziv: `${data}%` });
          break;
        case 'jm':
          query.andWhere(`artikl.jm like :jm`, { jm: `${data}%` });
          break;
        case 'pdv.stopa':
          query.andWhere(`pdv.stopa=:stopa`, { stopa: parseDecimal(data) });
          break;
        case 'cijena':
          console.log('cijena', data);
          query.andWhere(`artikl.cijena=:cijena`, {
            cijena: parseDecimal(data),
          });
          break;
        case 'active':
          query.andWhere(`artikl.active=:active`, { active: parseBool(data) });
          break;
      }
    });
  }
}

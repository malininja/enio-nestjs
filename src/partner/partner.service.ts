import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './partner.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { JqGridFilter, JqGridQueryDto } from 'src/common/jq-grid';
import {
  createGetCountQuery,
  createJqGridQuery,
  generateTimestamp,
} from 'src/common/database';
import { parseBool } from 'src/common/parsers';
import { PartnerDto } from './partner.dto';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner) private partnerRepository: Repository<Partner>,
  ) {}

  get(firmaId: number, partnerId: number): Promise<Partner> {
    return this.partnerRepository.findOne({
      where: { id: partnerId, firmaId },
    });
  }

  async getAll(
    firmaId: number,
    jqGridQueryDto: JqGridQueryDto,
  ): Promise<Partner[]> {
    const query = this.partnerRepository.createQueryBuilder('partner');

    createJqGridQuery(
      query,
      'partner',
      firmaId,
      jqGridQueryDto,
      this.addFilters,
    );

    return query.getMany();
  }

  getCount(firmaId: number, jqGridQueryDto: JqGridQueryDto): Promise<number> {
    const query = this.partnerRepository.createQueryBuilder('partner');
    createGetCountQuery(query, firmaId, jqGridQueryDto, this.addFilters);
    return query.getCount();
  }

  async save(firmaId: number, partnerDto: PartnerDto): Promise<Partner> {
    const {
      id,
      adresa,
      mjesto,
      naziv,
      oib,
      posta,
      valuta: valutaString,
      active,
      timestamp,
    } = partnerDto;

    const valuta = parseInt(valutaString);

    if (!id) {
      const partner = this.partnerRepository.create({
        firmaId,
        adresa,
        mjesto,
        naziv,
        oib,
        posta,
        valuta,
        active: true,
        timestamp: generateTimestamp(),
      });

      return this.partnerRepository.save(partner);
    }

    const result = await this.partnerRepository.update(
      { id, firmaId, timestamp },
      {
        firmaId,
        adresa,
        mjesto,
        naziv,
        oib,
        posta,
        valuta,
        active,
        timestamp: generateTimestamp(),
      },
    );

    if (!result.affected) return null;
    return this.get(firmaId, id);
  }

  private addFilters(
    filter: JqGridFilter,
    query: SelectQueryBuilder<Partner>,
  ): void {
    filter.rules.forEach((rule) => {
      const { field, data } = rule;
      switch (field) {
        case 'naziv':
          query.andWhere(`partner.naziv like :naziv`, { naziv: `${data}%` });
          break;
        case 'oib':
          query.andWhere(`partner.oib like :oib`, { oib: `${data}%` });
          break;
        case 'adresa':
          query.andWhere(`partner.adresa like :adresa`, { adresa: `${data}%` });
          break;
        case 'mjesto':
          query.andWhere(`partner.mjesto like :mjesto`, { mjesto: `${data}%` });
          break;
        case 'posta':
          query.andWhere(`partner.posta like :posta`, { posta: `${data}%` });
          break;
        case 'valuta':
          query.andWhere(`partner.valuta=:valuta`, { valuta: parseInt(data) });
          break;
        case 'active':
          query.andWhere(`partner.active=:active`, { active: parseBool(data) });
          break;
      }
    });
  }
}

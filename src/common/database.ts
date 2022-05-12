import { Artikl } from 'src/artikl/artikl.entity';
import { Pdv } from 'src/pdv/pdv.entity';
import { SelectQueryBuilder } from 'typeorm';
import {
  getJqGridFilters,
  getPagingData,
  getSortData,
  JqGridFilter,
  JqGridQueryDto,
} from './jq-grid';

export function generateTimestamp(): string {
  return new Date().getTime().toString();
}

type AddFiltersHandler = (
  filter: JqGridFilter,
  query: SelectQueryBuilder<Pdv | Artikl>,
) => void;

export function createJqGridQuery(
  query: SelectQueryBuilder<Pdv | Artikl>,
  tableName: string,
  firmaId: number,
  jqGridQueryDto: JqGridQueryDto,
  addFilters: AddFiltersHandler,
): void {
  const { pageSize, offset } = getPagingData(jqGridQueryDto);
  const sortData = getSortData(jqGridQueryDto);
  const filter = getJqGridFilters(jqGridQueryDto);

  query.where({ firmaId });

  if (filter) {
    addFilters(filter, query);
  }

  if (sortData) {
    const { field, order } = sortData;
    query.orderBy(`${tableName}.${field}`, order);
  }

  query.skip(offset);
  query.take(pageSize);
}

export function createGetCountQuery(
  query: SelectQueryBuilder<Pdv | Artikl>,
  firmaId: number,
  jqGridQueryDto: JqGridQueryDto,
  addFilters: AddFiltersHandler,
): void {
  query.where({ firmaId });

  const filter = getJqGridFilters(jqGridQueryDto);
  if (filter) {
    addFilters(filter, query);
  }
}

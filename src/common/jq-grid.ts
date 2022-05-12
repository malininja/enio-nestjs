export class JqGridFilterRule {
  field: string;
  data: string;
}

export class JqGridFilter {
  rules: JqGridFilterRule[];
}

export class JqGridQueryDto {
  rows: string;
  page: string;
  sidx: string;
  sord: string;
  filters: string;
}

export class PagingData {
  pageSize: number;
  pageNo: number;
  offset: number;
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export class SortData {
  field: string;
  order: SortOrder;
}

export class JqGridResponse {
  page: number;
  total: number;
  records: number;
  rows: any[];
}

export function getPagingData(jqGridQueryDto: JqGridQueryDto): PagingData {
  const { rows, page } = jqGridQueryDto;

  const pageSize = rows ? parseInt(rows) : 0;
  const pageNo = page ? parseInt(page) : 0;
  const offset = pageSize * (pageNo - 1);

  return { pageSize, pageNo, offset };
}

export function getSortData(jqGridQueryDto: JqGridQueryDto): SortData {
  const { sidx, sord } = jqGridQueryDto;

  if (!sidx || !sidx.length) return null;

  const getOrder = (): SortOrder => {
    if (!sord) return SortOrder.Asc;

    switch (sord.toLowerCase()) {
      case 'asc':
        return SortOrder.Asc;
      case 'desc':
        return SortOrder.Desc;
      default:
        throw new Error(`'${sord}' is not valid sort order`);
    }
  };

  return { field: sidx, order: getOrder() };
}

export function getJqGridFilters(jqGridQueryDto: JqGridQueryDto): JqGridFilter {
  const { filters } = jqGridQueryDto;

  if (!filters || !filters.length) return null;
  return JSON.parse(filters);
}

export function getJqGridResponse(
  data: any[],
  count: number,
  jqGridQueryDto: JqGridQueryDto,
): JqGridResponse {
  const { pageSize, pageNo } = getPagingData(jqGridQueryDto);

  return {
    page: pageNo,
    total: Math.ceil(count / pageSize),
    records: count,
    rows: data,
  };
}

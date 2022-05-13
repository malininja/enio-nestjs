import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';
import {
  getJqGridResponse,
  JqGridQueryDto,
  JqGridResponse,
} from '../common/jq-grid';
import { PartnerDto } from './partner.dto';

@Controller('api/partner')
export class PartnerController {
  constructor(private partnerService: PartnerService) {}

  @Get('/:id')
  getArtikl(@Param('id') id: number): Promise<Partner> {
    const firmaId = 1;
    return this.partnerService.get(firmaId, id);
  }

  @Get()
  async getPartners(
    @Query() jqGridQueryDto: JqGridQueryDto,
  ): Promise<JqGridResponse> {
    const firmaId = 1;
    const partners = await this.partnerService.getAll(firmaId, jqGridQueryDto);
    const count = await this.partnerService.getCount(firmaId, jqGridQueryDto);
    return getJqGridResponse(partners, count, jqGridQueryDto);
  }

  @Post()
  async saveArtikl(@Body() partnerDto: PartnerDto): Promise<boolean> {
    const firmaId = 1;
    const partner = await this.partnerService.save(firmaId, partnerDto);
    return !!partner;
  }
}

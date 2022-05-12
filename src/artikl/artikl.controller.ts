import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  getJqGridResponse,
  JqGridQueryDto,
  JqGridResponse,
} from '../common/jq-grid';
import { ArtiklDto } from './artikl.dto';
import { Artikl } from './artikl.entity';
import { ArtiklService } from './artikl.service';

@Controller('api/artikl')
export class ArtiklController {
  constructor(private artiklService: ArtiklService) {}

  @Get('/:id')
  getArtikl(@Param('id') id: number): Promise<Artikl> {
    const firmaId = 1;
    return this.artiklService.get(firmaId, id);
  }

  @Get()
  async getPdvs(
    @Query() jqGridQueryDto: JqGridQueryDto,
  ): Promise<JqGridResponse> {
    const firmaId = 1;
    const artikls = await this.artiklService.getAll(firmaId, jqGridQueryDto);
    const count = await this.artiklService.getCount(firmaId, jqGridQueryDto);
    return getJqGridResponse(artikls, count, jqGridQueryDto);
  }

  @Post()
  async saveArtikl(@Body() artiklDto: ArtiklDto): Promise<boolean> {
    const firmaId = 1;
    const artikl = await this.artiklService.save(firmaId, artiklDto);
    return !!artikl;
  }
}

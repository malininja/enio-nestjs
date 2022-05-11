import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import {
  getJqGridResponse,
  JqGridQueryDto,
  JqGridResponse,
} from 'src/common/jqGrid';
import { PdvDto } from './dto/pdv.dto';
import { Pdv } from './pdv.entity';
import { PdvService } from './pdv.service';

@Controller('api/pdv')
export class PdvController {
  constructor(private pdvService: PdvService) {}

  @Get()
  async getPdvs(
    @Query() jqGridQueryDto: JqGridQueryDto,
  ): Promise<JqGridResponse> {
    console.log(jqGridQueryDto);
    const firmaId = 1;
    const pdvs = await this.pdvService.getAll(firmaId, jqGridQueryDto);
    const count = await this.pdvService.getCount(firmaId, jqGridQueryDto);
    return getJqGridResponse(pdvs, count, jqGridQueryDto);
  }

  @Post()
  async savePdv(@Body() pdvDto: PdvDto): Promise<boolean> {
    const firmaId = 1;
    const pdv = await this.pdvService.save(firmaId, pdvDto);
    return !!pdv;
  }

  @Get('/:id')
  async getPdv(@Param('id') id: number): Promise<Pdv> {
    const firmaId = 1;
    return this.pdvService.get(firmaId, id);
  }
}

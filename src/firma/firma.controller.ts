import { Body, Controller, Get, Post } from '@nestjs/common';
import { FirmaDto } from './dto/firma.dto';
import { Firma } from './firma.entity';
import { FirmaService } from './firma.service';

@Controller('api/firma')
export class FirmaController {
  constructor(private firmaService: FirmaService) {}

  @Get()
  async getFirma(): Promise<Firma> {
    const firmaId = 1;
    return this.firmaService.get(firmaId);
  }

  @Post()
  async saveFirma(@Body() firmaDto: FirmaDto): Promise<Firma> {
    const firmaId = 1;
    return this.firmaService.save(firmaId, firmaDto);
  }
}

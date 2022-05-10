import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirmaController } from './firma.controller';
import { Firma } from './firma.entity';
import { FirmaService } from './firma.service';

@Module({
  imports: [TypeOrmModule.forFeature([Firma])],
  controllers: [FirmaController],
  providers: [FirmaService],
})
export class FirmaModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtiklController } from './artikl.controller';
import { Artikl } from './artikl.entity';
import { ArtiklService } from './artikl.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artikl])],
  controllers: [ArtiklController],
  providers: [ArtiklService],
})
export class ArtiklModule {}

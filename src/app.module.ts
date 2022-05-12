import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FirmaModule } from './firma/firma.module';
import { PdvModule } from './pdv/pdv.module';
import { ArtiklModule } from './artikl/artikl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
        logging: process.env.STAGE !== 'prod',
      }),
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', '../static') }),
    FirmaModule,
    PdvModule,
    ArtiklModule,
  ],
})
export class AppModule {}

import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class FirmaDto {
  @IsString()
  @Length(3, 100)
  naziv: string;

  @IsString()
  @MaxLength(100)
  adresa: string;

  @IsString()
  @MaxLength(100)
  mjesto: string;

  @IsString()
  @IsNotEmpty()
  @Length(11)
  oib: string;

  @IsString()
  @MaxLength(100)
  zr: string;

  @IsNotEmpty()
  @Length(13)
  timestamp: string;
}

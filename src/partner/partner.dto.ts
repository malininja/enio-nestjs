import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class PartnerDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  adresa: string;

  @IsOptional()
  @IsString()
  @Length(2, 40)
  mjesto: string;

  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  naziv: string;

  @IsOptional()
  @IsString()
  @Length(11)
  oib: string;

  @IsOptional()
  @IsString()
  @Length(4, 10)
  posta: string;

  @IsNotEmpty()
  @IsInt()
  valuta: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsString()
  timestamp: string;
}

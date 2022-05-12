import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class ArtiklPdvDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}

export class ArtiklDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  naziv: string;

  @IsString()
  @Length(2, 10)
  @IsNotEmpty()
  jm: string;

  @IsNotEmpty()
  pdv: ArtiklPdvDto;

  @IsNotEmpty()
  cijena: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsOptional()
  @IsString()
  timestamp: string;
}

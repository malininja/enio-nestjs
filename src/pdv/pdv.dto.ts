import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class PdvDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  naziv: string;

  @IsNotEmpty()
  stopa: string;

  @IsOptional()
  @IsString()
  timestamp: string;
}

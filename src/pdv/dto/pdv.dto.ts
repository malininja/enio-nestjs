import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class PdvDto {
  id?: number;

  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  naziv: string;

  @IsNotEmpty()
  stopa: string;

  timestamp: string;
}

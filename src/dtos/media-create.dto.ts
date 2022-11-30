import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Gender } from '../common/interfaces';

export class MediaCreateDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  patology: string;

  @IsNumber()
  age: number;

  @IsEnum(Gender)
  gender: Gender;

  @IsNumber()
  @IsOptional()
  scale?: number;
}

import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

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
}

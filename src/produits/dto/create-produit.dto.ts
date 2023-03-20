import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProduitDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nom: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  prix: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantite: number;
}

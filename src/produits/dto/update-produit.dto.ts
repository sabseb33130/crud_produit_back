import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateProduitDto } from './create-produit.dto';

export class UpdateProduitDto extends PartialType(CreateProduitDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  nom: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  prix: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantite: number;
}

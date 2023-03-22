import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Controller('Api/produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Post()
  async create(@Body() createProduitDto: CreateProduitDto) {
    const produitExiste = await this.produitsService.findNom(
      createProduitDto.nom,
    );
    if (produitExiste) {
      throw new NotFoundException('Ce produit existe déjà.');
    }
    const newProduit = await this.produitsService.create(createProduitDto);
    return {
      status: 201,
      message: `Votre Produit ${createProduitDto.nom} vient d'être ajouter à la liste .`,
      data: newProduit,
    };
  }

  @Get()
  async findAll() {
    const allProduit = await this.produitsService.findAll();

    return {
      status: 200,
      message: 'Voici la liste complète des produits.',
      data: allProduit,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const oneProduit = await this.produitsService.findOne(id);
    if (oneProduit === null) {
      throw new NotFoundException("Le produit n'existe pas.");
    }
    return {
      status: 200,
      message: 'Voici le produit demandé.',
      data: oneProduit,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduitDto: UpdateProduitDto,
  ) {
    const oneProduit = await this.produitsService.findOne(id);
    if (oneProduit === null) {
      throw new NotFoundException("Le produit n'existe pas.");
    }
    const upProduit = await this.produitsService.update(id, updateProduitDto);
    return {
      status: 200,
      message: `Les données du produit ${oneProduit.id} ont été mise à jour`,
      data: upProduit,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const oneProduit = await this.produitsService.findOne(+id);
    if (oneProduit === null) {
      throw new NotFoundException(
        "Le produit n'existe pas ou a déjà était supprimé.",
      );
    }
    const delProduit = await this.produitsService.remove(id);
    return {
      status: 200,
      message: `Le produit ${oneProduit.nom} vient d'être supprimé`,
      data: delProduit,
    };
  }
}

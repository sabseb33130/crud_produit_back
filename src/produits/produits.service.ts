import { Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitsService {
  async create(createProduitDto: CreateProduitDto): Promise<Produit> {
    const newProduit = new Produit();
    newProduit.nom = createProduitDto.nom;
    newProduit.prix = createProduitDto.prix;
    newProduit.quantite = createProduitDto.quantite;

    const produitNew = await Produit.save(newProduit);
    return produitNew;
  }

  async findAll(): Promise<Produit[]> {
    const allProduit = await Produit.find();
    return allProduit;
  }

  async findOne(id: number): Promise<Produit> {
    const oneProduit = await Produit.findOneBy({ id: id });

    return oneProduit;
  }
  async findNom(nom: string): Promise<Produit> {
    const oneNomProduit = await Produit.findOneBy({ nom: nom });

    return oneNomProduit;
  }

  async update(
    id: number,
    updateProduitDto: UpdateProduitDto,
  ): Promise<Produit> {
    await Produit.update(id, updateProduitDto);
    const oneProduit = Produit.findOneBy({ id: id });
    return oneProduit;
  }

  async remove(id: number): Promise<Produit> {
    const deleteProduit = await Produit.findOneBy({ id: id });
    Produit.remove(deleteProduit);
    return deleteProduit;
  }
}

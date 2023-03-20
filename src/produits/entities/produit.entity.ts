import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  nom: string;

  @Column('numeric')
  prix: number;

  @Column('integer')
  quantite: number;
}

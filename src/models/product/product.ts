import { Company } from '@models/company/company';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  idProduct: number;

  @ManyToOne(() => Company, company => company.product)
  company: Company;
}

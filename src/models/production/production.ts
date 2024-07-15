import { Company } from '@models/company/company';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Production')
export class Production {
  @PrimaryGeneratedColumn()
  idProduction: number;

  @Column({ type: 'char', length: 20 })
  lineCode: string;

  @Column({ type: 'varchar', length: 30 })
  lineName: string;

  @Column({ type: 'float' })
  productQty: number;

  @ManyToOne(() => Company, company => company.idCompany)
  id_Company: Company;
}

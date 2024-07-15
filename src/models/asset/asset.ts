import { Company } from '@models/company/company';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Asset')
export class Asset {
  @PrimaryGeneratedColumn()
  idAsset: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  project: string;

  @Column({ type: 'char', length: 100 })
  productionLine: string;

  @Column({ type: 'varchar', length: 300 })
  comment: string;

  @ManyToOne(() => Company, company => company.idCompany)
  id_Company: Company;
}

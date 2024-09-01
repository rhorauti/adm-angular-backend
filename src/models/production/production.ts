import { Company } from '@models/company/company';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Production')
export class Production {
  @PrimaryGeneratedColumn()
  idProduction: number;

  @Column({ type: 'char', length: 20, nullable: true })
  lineCode: string;

  @Column({ type: 'varchar', length: 30 })
  lineName: string;

  @Column({ type: 'float' })
  productQtyPlan: number;

  @Column({ type: 'float' })
  productQtyActual: number;

  @ManyToOne(() => Company, company => company.production, { nullable: true })
  company: Company;
}

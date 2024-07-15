import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company';

@Entity('CompanyType')
export class CompanyType {
  @PrimaryGeneratedColumn()
  idCompanyType: number;

  @Column({ type: 'char', length: 15 })
  name: string;

  @ManyToOne(() => Company, company => company.companyType)
  @JoinColumn({ name: 'id_Company' })
  company: Company;
}

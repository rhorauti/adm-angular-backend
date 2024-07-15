import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { CompanyType } from './companyType';

@Entity('Company')
export class Company {
  @PrimaryGeneratedColumn()
  idCompany: number;

  @CreateDateColumn()
  date: Timestamp;

  @Column({ type: 'char', length: 20, unique: true })
  nickname: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'char', length: 20, unique: true })
  cnpj: string;

  @OneToMany(() => CompanyType, companyType => companyType.company)
  companyType: CompanyType[];
}

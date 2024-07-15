import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../company/company';

@Entity('Employee')
export class Employee {
  @PrimaryGeneratedColumn()
  idEmployee: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'char', length: 50 })
  department: string;

  @Column({ type: 'char', length: 50 })
  position: string;

  @Column({ type: 'char', length: 50 })
  email: string;

  @Column({ type: 'char', length: 12 })
  deskphone: string;

  @Column({ type: 'char', length: 12 })
  cellphone: string;

  @ManyToOne(() => Company, company => company.idCompany)
  id_Company: Company;
}

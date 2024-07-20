import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../employee/employee';
import { Company } from '@models/company/company';

@Entity('Adress')
export class Address {
  @PrimaryGeneratedColumn()
  idAddress: number;

  @Column({ type: 'char', length: 15 })
  type: string;

  @Column({ type: 'varchar', length: 150 })
  adress: string;

  @Column({ type: 'int' })
  number: number;

  @Column({ type: 'char', length: 50 })
  complement: string;

  @Column({ type: 'char', length: 50 })
  district: string;

  @Column({ type: 'char', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 2 })
  state: string;

  @ManyToOne(() => Company, company => company.adress)
  @JoinColumn({ name: 'id_Company' })
  company: Company;

  @OneToOne(() => Employee, employee => employee.adress)
  @JoinColumn({ name: 'id_Employee' })
  employee: Employee;
}

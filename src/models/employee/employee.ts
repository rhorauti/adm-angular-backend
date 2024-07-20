import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../company/company';
import { Address } from '@models/adress/address';
import { EmployeeContract } from './employeeContract';
import { EmployeeVacation } from './employeeVacation';

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

  @Column({ type: 'char', length: 20 })
  deskphone: string;

  @Column({ type: 'char', length: 20 })
  cellphone: string;

  @ManyToOne(() => Company, company => company.employee)
  company: Company;

  @OneToOne(() => Address, adress => adress.employee)
  adress: Address;

  @OneToOne(() => EmployeeContract, employeeContract => employeeContract.employee)
  employeeContract: EmployeeContract;

  @OneToMany(() => EmployeeVacation, employeeVacation => employeeVacation.employee)
  employeeVacation: EmployeeVacation;
}

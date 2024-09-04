import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @Column({ type: 'char', length: 14, nullable: true })
  cpf: string;

  @Column({ type: 'char', length: 50, nullable: true })
  department: string;

  @Column({ type: 'char', length: 50, nullable: true })
  position: string;

  @Column({ type: 'char', length: 50, nullable: true })
  email: string;

  @Column({ type: 'char', length: 20, nullable: true })
  deskphone: string;

  @Column({ type: 'char', length: 20, nullable: true })
  cellphone: string;

  @ManyToOne(() => Company, company => company.employee, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_Company' })
  company: Company;

  @OneToOne(() => Address, adress => adress.employee, { nullable: true })
  adress: Address;

  @OneToOne(() => EmployeeContract, employeeContract => employeeContract.employee, {
    nullable: true,
  })
  employeeContract: EmployeeContract;

  @OneToMany(() => EmployeeVacation, employeeVacation => employeeVacation.employee, {
    nullable: true,
  })
  employeeVacation: EmployeeVacation;
}

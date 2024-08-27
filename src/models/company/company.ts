import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { CompanyType } from './companyType';
import { Address } from '@models/adress/address';
import { Employee } from '@models/employee/employee';
import { Asset } from '@models/asset/asset';
import { ProjectCompany } from '@models/project/project_company';
import { Invoice } from '@models/invoice/invoice';
import { Production } from '@models/production/production';
import { Product } from '@models/product/product';
import { PurchasingOrder } from '@models/purchasing-order/purchasingOrder';

@Entity('Company')
export class Company {
  @PrimaryGeneratedColumn()
  idCompany: number;

  @CreateDateColumn()
  date: Timestamp;

  @Column({ type: 'char', length: 50, unique: true })
  nickname: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'char', length: 20, unique: true })
  cnpj: string;

  @OneToMany(() => CompanyType, companyType => companyType.company)
  companyType: CompanyType[];

  @OneToMany(() => Address, adress => adress.company)
  adress: Address[];

  @OneToMany(() => Employee, employee => employee.company)
  employee: Employee;

  @OneToMany(() => Asset, asset => asset.company)
  asset: Asset;

  @OneToMany(() => ProjectCompany, projectCompany => projectCompany.company)
  projectCompany: ProjectCompany;

  @OneToMany(() => Invoice, invoice => invoice.company)
  invoice: Invoice;

  @OneToMany(() => Production, production => production.company)
  production: Production;

  @OneToMany(() => Product, product => product.company)
  product: Product;

  @OneToMany(() => PurchasingOrder, purchasingOrder => purchasingOrder.company)
  purchasingOrder: PurchasingOrder;
}

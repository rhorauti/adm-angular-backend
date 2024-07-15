import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PurchasingOrder } from './purchasingOrder';
import { Company } from '@models/company/company';

@Entity()
export class PurchasingOrderCompany {
  @PrimaryGeneratedColumn()
  idPurchasingOrderCompany: number;

  @ManyToOne(() => PurchasingOrder, purchasingOrder => purchasingOrder.idPurchasingOrder)
  id_PurchasingOrder_Company: number;

  @ManyToOne(() => Company, company => company.idCompany)
  id_Company: Company;
}

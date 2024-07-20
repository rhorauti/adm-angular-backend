import { Company } from '@models/company/company';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PurchasingOrder')
export class PurchasingOrder {
  @PrimaryGeneratedColumn()
  idPurchasingOrder: number;

  @Column({ type: 'float' })
  productQty: number;

  @Column({ type: 'char', length: 30 })
  paymentCondition: string;

  @ManyToOne(() => Company, company => company.purchasingOrder)
  @JoinColumn({ name: 'id_Company'})
  company: Company;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PurchasingOrder')
export class PurchasingOrder {
  @PrimaryGeneratedColumn()
  idPurchasingOrder: number;

  @Column({ type: 'float' })
  productQty: number;

  @Column({ type: 'char', length: 30 })
  paymentCondition: string;
}

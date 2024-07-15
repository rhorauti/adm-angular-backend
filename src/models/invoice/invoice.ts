import { Company } from '@models/company/company';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('Invoice')
export class Invoice {
  @PrimaryGeneratedColumn()
  idInvoice: number;

  @Column({ type: 'timestamp' })
  issueDate: Timestamp;

  //entrada ou saída
  @Column({ type: 'char', length: 10 })
  type: string;

  @Column({ type: 'timestamp' })
  paymentDatePlan: Timestamp;

  @Column({ type: 'timestamp' })
  paymentDateActual: Timestamp;

  @ManyToOne(() => Company, company => company.idCompany)
  id_Company: Company;
}

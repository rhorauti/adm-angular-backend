import { Company } from '@models/company/company';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('Invoice')
export class Invoice {
  @PrimaryGeneratedColumn()
  idInvoice: number;

  @Column({ type: 'timestamp' })
  issueDate: Timestamp;

  //entrada ou saída
  @Column({ type: 'char', length: 10 })
  type: string;

  @Column({ type: 'timestamp', nullable: true })
  paymentDatePlan: Timestamp;

  @Column({ type: 'timestamp', nullable: true })
  paymentDateActual: Timestamp;

  @ManyToOne(() => Company, company => company.invoice, { nullable: true })
  @JoinColumn({ name: 'id_Company' })
  company: Company;
}

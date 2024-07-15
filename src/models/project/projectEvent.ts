import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('ProjectEvent')
export class ProjectEvent {
  @PrimaryGeneratedColumn()
  idProjectEvent: number;

  @Column({ type: 'char', length: 20 })
  name: string;

  @Column({ type: 'float' })
  productQtyPlan: number;

  @Column({ type: 'float' })
  productQtyActual: number;

  @Column({ type: 'timestamp' })
  deliveryDatePlan: Timestamp;

  @Column({ type: 'timestamp' })
  deliveryDateActual: Timestamp;

  @Column({ type: 'varchar', length: 100 })
  comment: string;
}

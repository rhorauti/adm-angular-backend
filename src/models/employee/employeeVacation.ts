import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Employee } from './employee';

@Entity('EmployeeVacation')
export class EmployeeVacation {
  @PrimaryGeneratedColumn()
  idEmployeeVacation: number;

  @Column({ type: 'boolean' })
  isOnVacation: boolean;

  @Column({ type: 'int' })
  contractLeadtime: number;

  @Column({ type: 'int' })
  availableLeadtime: number;

  @Column({ type: 'timestamp' })
  startDate: Timestamp;

  @Column({ type: 'timestamp' })
  finishDate: Timestamp;

  @Column({ type: 'timestamp' })
  limitDate: Timestamp;

  @Column({ type: 'varchar', length: 300 })
  comment: string;

  @ManyToOne(() => Employee, employee => employee.idEmployee)
  id_Employee: Employee;
}

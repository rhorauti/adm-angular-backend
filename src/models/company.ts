import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('Company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  type: number;

  @Column({ type: 'timestamp' })
  date: Timestamp;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 20 })
  cnpj: string;

  @Column({ type: 'varchar', length: 150 })
  adress: string;

  @Column({ type: 'int' })
  number: number;

  @Column({ type: 'varchar', length: 100 })
  complement: string;

  @Column({ type: 'varchar', length: 50 })
  district: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 2 })
  state: string;
}

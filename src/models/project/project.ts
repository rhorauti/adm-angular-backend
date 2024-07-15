import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('Project')
export class Project {
  @PrimaryGeneratedColumn()
  idProject: number;

  @Column({ type: 'timestamp' })
  date: Timestamp;

  @Column({ type: 'char', length: 15 })
  code: string;

  @Column({ type: 'char', length: 20 })
  product: string;

  @Column({ type: 'timestamp' })
  startOfProduction: Timestamp;
}

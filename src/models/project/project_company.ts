import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project';
import { Company } from '@models/company/company';

@Entity()
export class ProjectCompany {
  @PrimaryGeneratedColumn()
  idProjectCompany: number;

  @ManyToOne(() => Project, project => project.idProject)
  id_Project: Project;

  @ManyToOne(() => Company, company => company.idCompany)
  id_Company: Company;
}

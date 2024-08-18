import { dataSource } from '@migrations/index';
import { Project } from '@models/project/project';

export class ProjectRepository {
  private projectRepository = dataSource.getRepository(Project);

  /**
   * getAllProjectRegisters
   *
   * get list of registeres from database according to companies type (customer, suppliers, my company)
   * @param companyId number.
   * @returns Promise<Project[]>
   */
  async getAllProjectRegisters(companyId: number): Promise<Project[]> {
    return await this.projectRepository
      .createQueryBuilder()
      .select('project')
      .where('project.id_Company = companyId', { companyId: companyId })
      .getMany();
  }
}

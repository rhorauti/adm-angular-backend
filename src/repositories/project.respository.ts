import { dataSource } from '@migrations/index';
import { Project } from '@models/project/project';

export class ProjectRepository {
  private projectRepository = dataSource.getRepository(Project);

  async getProjectList(companyId: number): Promise<Project[]> {
    return await this.projectRepository
      .createQueryBuilder()
      .select('project')
      .where('project.id_Company = companyId', { companyId: companyId })
      .getMany();
  }
}

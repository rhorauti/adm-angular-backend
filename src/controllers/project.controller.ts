import { ProjectRepository } from '@repositories/project.respository';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ProjectController {
  constructor(@inject('ProjectRepository') private projectRepository: ProjectRepository) {}

  async getProjectsList(request: Request, response: Response): Promise<Response> {
    const projectList = await this.projectRepository.getAllProjectRegisters(request.body.idCompany);
    if (!projectList) {
      return response.status(400).json({
        status: false,
        message: 'Nenhum registro encontrado',
      });
    } else {
      projectList.sort((a, b) => {
        if (a.idProject > b.idProject) {
          return -1;
        }
      });
      return response.status(200).json({
        date: new Date(),
        status: true,
        message: 'Dados enviados com sucesso.',
        data: projectList,
      });
    }
  }
}

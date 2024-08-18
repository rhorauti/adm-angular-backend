import { CompanyRepository } from '@repositories/company.respository';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CompanyController {
  constructor(@inject('CompanyRepository') private companyRepository: CompanyRepository) {}

  async getCompanyList(request: Request, response: Response): Promise<Response> {
    console.log(request.params.companyType);
    const companiesList = await this.companyRepository.getAllCompanyRegisters(
      Number(request.params.companyType),
    );
    console.log(companiesList);
    if (!companiesList) {
      return response.status(400).json({
        status: false,
        message: 'Nenhum registro encontrando!',
      });
    } else {
      companiesList.sort((a, b) => {
        if (a.idCompany > b.idCompany) {
          return -1;
        }
      });
      return response.status(200).json({
        date: new Date(),
        status: true,
        message: 'Lista recebida com sucesso!',
        data: companiesList,
      });
    }
  }

  async addNewCompany(request: Request, response: Response): Promise<Response> {
    const company = await this.companyRepository.findCompanyByName(
      request.body.name,
      Number(request.params.id),
    );
    if (company) {
      return response.status(401).json({
        status: false,
        message: `Empresa ${company.name} já existe!`,
      });
    } else {
      const newCompany = await this.companyRepository.saveCompany(request.body);
      if (!newCompany) {
        return response.status(500).json({
          status: false,
          message: 'Erro interno do servidor!',
        });
      } else {
        return response.status(200).json({
          status: true,
          message: `Empresa ${newCompany.name} registrada com sucesso!`,
          data: newCompany,
        });
      }
    }
  }

  async updateCompany(request: Request, response: Response): Promise<Response> {
    const customer = await this.companyRepository.findCompanyById(Number(request.params.id));
    if (!customer) {
      return response.status(400).json({
        status: false,
        message: 'Empresa não encontrada!',
      });
    } else {
      await this.companyRepository.updateCompany(request.body, request.params.id);
      return response.status(200).json({
        status: true,
        message: `Empresa ${request.body.nome} alterada com sucesso!`,
      });
    }
  }

  async deleteCompany(request: Request, response: Response): Promise<Response> {
    const company = await this.companyRepository.findCompanyById(Number(request.params.id));
    if (!company) {
      return response.status(400).json({
        status: false,
        message: 'Empresa não encontranda!',
      });
    } else {
      await this.companyRepository.deleteCompany(request.params.id);
      return response.status(200).json({
        status: true,
        message: `Empresa ${company.name} excluida com sucesso!`,
      });
    }
  }
}

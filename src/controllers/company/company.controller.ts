import { dataSource } from '@migrations/index';
import { Company } from '@models/company/company';
import { CompanyType } from '@models/company/companyType';
import { CompanyRepository } from '@repositories/company/company.respository';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { Brackets, QueryRunner } from 'typeorm';

@injectable()
export class CompanyController {
  constructor(@inject('CompanyRepository') private companyRepository: CompanyRepository) {}

  async getCompanyList(request: Request, response: Response): Promise<Response> {
    const companiesList = await this.companyRepository.getAllCompanyRegisters(
      Number(request.params.companyType),
    );
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
    const queryRunner: QueryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existingCompany = await queryRunner.manager
        .createQueryBuilder(Company, 'company')
        .innerJoin('company.companyType', 'companyType')
        .where(
          new Brackets(qb => {
            qb.where('company.nickname = :nickname', { nickname: request.body.nickname }).andWhere(
              'companyType.type = :type',
              { type: Number(request.params.companyType) },
            );
          }),
        )
        .orWhere(
          new Brackets(qb => {
            qb.where('company.name = :name', { name: request.body.name }).andWhere(
              'companyType.type = :type',
              { type: Number(request.params.companyType) },
            );
          }),
        )
        .orWhere(
          new Brackets(qb => {
            qb.where('company.cnpj = :cnpj', { cnpj: request.body.cnpj }).andWhere(
              'companyType.type = :type',
              { type: Number(request.params.companyType) },
            );
          }),
        )
        .getOne();
      if (existingCompany) {
        await queryRunner.rollbackTransaction();
        let message = 'A empresa já existe com o mesmo ';
        if (existingCompany.nickname == request.body.nickname)
          message += `nickname: ${existingCompany.nickname}`;
        else if (existingCompany.name == request.body.name)
          message += `nome: ${existingCompany.name}`;
        else if (existingCompany.cnpj == request.body.cnpj)
          message += `CNPJ: ${existingCompany.cnpj}`;
        return response.status(401).json({
          status: false,
          message: message,
        });
      }
      request.body.idCompany = null;
      const newCompany = queryRunner.manager.create(Company, request.body);
      const savedCompany = await queryRunner.manager.save(newCompany);

      const newCompanyType = queryRunner.manager.create(CompanyType, {
        idCompanyType: null,
        type: Number(request.params.companyType),
        company: savedCompany,
      });

      await queryRunner.manager.save(newCompanyType);
      await queryRunner.commitTransaction();

      return response.status(200).json({
        status: true,
        message: `Empresa ${savedCompany.name} registrada com sucesso!`,
        data: savedCompany,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return response.status(500).json({
        status: false,
        message: 'Erro interno do servidor!',
        error: error.message,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async updateCompany(request: Request, response: Response): Promise<Response> {
    const company = await this.companyRepository.findCompanyByName(
      request.body.name,
      Number(request.params.id),
    );
    if (company) {
      const company = await this.companyRepository.saveCompany(request.body);
      if (!company) {
        return response.status(500).json({
          status: false,
          message: 'Erro interno do servidor!',
        });
      } else {
        return response.status(200).json({
          status: true,
          message: `Empresa ${(company as Company).name} alterada com sucesso!`,
          data: company,
        });
      }
    }
  }

  // async deleteCompany(request: Request, response: Response): Promise<Response> {
  //   const company = await this.companyRepository.findCompanyById(Number(request.params.id));
  //   if (!company) {
  //     return response.status(400).json({
  //       status: false,
  //       message: 'Empresa não encontranda!',
  //     });
  //   } else {
  //     await this.companyRepository.deleteCompany(request.params.id);
  //     return response.status(200).json({
  //       status: true,
  //       message: `Empresa ${company.name} excluida com sucesso!`,
  //     });
  //   }
  // }
}

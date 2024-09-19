import { dataSource } from '@migrations/index';
import { Company } from '@models/company/company';
import { CompanyRepository } from '@repositories/company/company.respository';
import { CustomError } from '@src/middlewares/error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { Brackets, QueryRunner } from 'typeorm';

@injectable()
export class CompanyController {
  constructor(@inject('CompanyRepository') private companyRepository: CompanyRepository) {}

  async getCompanyList(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const companiesList = await this.companyRepository.getAllCompanies();
      companiesList.sort((a, b) => {
        if (a.idCompany > b.idCompany) {
          return -1;
        }
      });
      return response.status(200).json({
        date: new Date(),
        status: true,
        msg: 'Lista recebida com sucesso!',
        data: companiesList,
      });
    } catch (error) {
      next(error);
    }
  }

  async addNewCompany(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { nickname, name, cnpj, ie, im, type } = request.body[0];

      const existingCompany = await queryRunner.manager
        .createQueryBuilder(Company, 'company')
        .where(
          new Brackets(qb => {
            qb.where('company.nickname = :nickname', {
              nickname: nickname,
            }).andWhere('company.type = :type', { type: type });
          }),
        )
        .orWhere(
          new Brackets(qb => {
            qb.where('company.name = :name', { name: name }).andWhere('company.type = :type', {
              type: type,
            });
          }),
        )
        .orWhere(
          new Brackets(qb => {
            qb.where('company.cnpj = :cnpj', { cnpj: cnpj }).andWhere('company.type = :type', {
              type: type,
            });
          }),
        )
        .orWhere(
          new Brackets(qb => {
            qb.where('company.ie = :ie', { ie: ie })
              .andWhere('company.type = :type', {
                type: type,
              })
              .andWhere('company.ie <> ""');
          }),
        )
        .orWhere(
          new Brackets(qb => {
            qb.where('company.im = :im', { im: im })
              .andWhere('company.type = :type', {
                type: type,
              })
              .andWhere('company.ie <> ""');
          }),
        )
        .getOne();
      if (existingCompany) {
        await queryRunner.rollbackTransaction();
        let msg = 'A empresa já existe com o mesmo ';
        if (existingCompany.nickname.trim().toLowerCase() == nickname.trim().toLowerCase())
          msg += `nickname: ${existingCompany.nickname}`;
        else if (existingCompany.name.trim().toLowerCase() == name.trim().toLowerCase())
          msg += `nome: ${existingCompany.name}`;
        else if (existingCompany.cnpj.trim().toLowerCase() == cnpj.trim().toLowerCase())
          msg += `CNPJ: ${existingCompany.cnpj}`;
        else if (existingCompany.ie.trim().toLowerCase() == ie.trim().trim().toLowerCase())
          msg += `Inscrição Estadual: ${existingCompany.ie}`;
        else if (existingCompany.im.trim().toLowerCase() == im.trim().toLowerCase())
          msg += `Inscrição Municipal: ${existingCompany.im}`;
        const error = new Error(msg) as CustomError;
        error.statusCode = 400;
        return next(error);
      }
      if (ie == '') request.body[0].ie = null;
      if (im == '') request.body[0].im = null;

      const company = queryRunner.manager.create(Company, request.body[0]);
      const savedCompany = await queryRunner.manager.save(company);

      await queryRunner.commitTransaction();

      return response.status(200).json({
        status: true,
        msg: `Empresa ${savedCompany.name} registrada com sucesso!`,
        data: savedCompany,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return next(error);
    } finally {
      await queryRunner.release();
    }
  }

  async checkExistingCompany(request: Request, next: NextFunction): Promise<Response | void> {
    const { nickname, name, cnpj, ie, im, type, idCompany } = request.body[0];
    if (ie == '') request.body[0].ie = null;
    if (im == '') request.body[0].im = null;
    const companiesList = await this.companyRepository.getAllCompanies();
    let error: CustomError | null = null;
    console.log('request.body', request.body[0], ie != null, im != null);
    companiesList.forEach(company => {
      if (company.idCompany != idCompany && company.nickname == nickname && company.type == type) {
        error = new Error('Outra empresa já existe com o mesmo apelido') as CustomError;
      } else if (company.idCompany != idCompany && company.name == name && company.type == type) {
        error = new Error('Outra empresa já existe com o mesmo nome') as CustomError;
      } else if (company.idCompany != idCompany && company.cnpj == cnpj && company.type == type) {
        error = new Error('Outra empresa já existe com o mesmo cnpj') as CustomError;
      } else if (
        company.idCompany != idCompany &&
        ie != null &&
        ie != '' &&
        company.ie == ie &&
        company.type == type
      ) {
        error = new Error('Outra empresa já existe com a mesma inscrição estadual') as CustomError;
      } else if (
        company.idCompany != idCompany &&
        im != null &&
        im != '' &&
        company.im == im &&
        company.type == type
      ) {
        error = new Error('Outra empresa já existe com a mesma inscrição municipal') as CustomError;
      }
      if (error) {
        error.statusCode = 400;
        return next(error);
      }
    });
  }

  async updateCompany(request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      this.checkExistingCompany(request, next);
      const idCompany = Number(request.params.idCompany);
      const company = await this.companyRepository.findCompanyById(idCompany);
      if (request.body[0].ie == '') request.body[0].ie = null;
      if (request.body[0].im == '') request.body[0].im = null;
      await this.companyRepository.saveCompany(request.body[0]);
      return response.status(200).json({
        status: true,
        msg: `Empresa ${(company as Company).name} alterada com sucesso!`,
        data: company,
      });
    } catch (error) {
      next(error);
    }
  }

  // verificar
  async deleteCompany(request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const idCompany = Number(request.params.idCompany);
      console.log('idCompany', idCompany);
      const company = await this.companyRepository.findCompanyById(idCompany);
      console.log('companydelete', company);
      await this.companyRepository.deleteCompany(idCompany);
      return response.status(200).json({
        status: true,
        msg: `Empresa ${company.name} excluida com sucesso!`,
      });
    } catch (error) {
      next(error);
    }
  }
}

import { CompanyController } from '@controllers/company/company.controller';
import Router from 'express';
import { container } from 'tsyringe';

const companyRoute = Router();
const version = 'v1';

const companyController = container.resolve(CompanyController);

companyRoute.get(`/${version}/company/:companyType`, (request, response) => {
  companyController.getCompanyList(request, response);
});

companyRoute.post(`/${version}/company/:companyType`, (request, response) => {
  companyController.addNewCompany(request, response);
});

companyRoute.put(`/${version}/company/:idCompany`, (request, response) => {
  companyController.updateCompany(request, response);
});

companyRoute.delete(`/${version}/company/:idCompany`, (request, response) => {
  companyController.deleteCompany(request, response);
});

export { companyRoute };

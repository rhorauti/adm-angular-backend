import { modelsBase } from '@containers/index';
import { AuthController } from '@controllers/auth.controller';
import { BaseController } from '@controllers/base.controller';
import { CompanyController } from '@controllers/company.controller';
import { Address } from '@models/adress/address';
import { Employee } from '@models/employee/employee';
import { Project } from '@models/project/project';
import { Router } from 'express';
import { container } from 'tsyringe';

const router = Router();

container.register('Entity', { useValue: Address });

const authController = container.resolve(AuthController);
const companyController = container.resolve(CompanyController);
const addressController = container.resolve<BaseController<Address>>('BaseController<Address>');
const employeeController = container.resolve<BaseController<Employee>>('BaseController<Employee>');
const projectController = container.resolve<BaseController<Project>>('BaseController<Project>');

router.post('/login', (request, response) => {
  authController.loginUser(request, response);
});

router.post('/signup', (request, response) => {
  authController.createNewUser(request, response);
});

router.get('/email-validation', (request, response) => {
  authController.confirmUserValidation(request, response);
});

router.post('/reset-password', (request, response) => {
  authController.getNewEmailValidation(request, response);
});

router.post('/new-password', (request, response) => {
  authController.resetPassword(request, response);
});

router.get('/company/:companyType', (request, response) => {
  companyController.getCompanyList(request, response);
});

router.post('/company/:id', (request, response) => {
  companyController.addNewCompany(request, response);
});

router.put('/company/:id', (request, response) => {
  companyController.updateCompany(request, response);
});

router.delete('/company/:id', (request, response) => {
  companyController.deleteCompany(request, response);
});

router.get('/address/:id', (request, response) => {
  addressController.getList(request, response, 'id_Address');
});

router.get('/project/:id', (request, response) => {
  projectController.getList(request, response, 'id_Project');
});

router.get('/employee/:id', (request, response) => {
  employeeController.getList(request, response, 'id_Employee');
});

export { router };

import { AuthController } from '@controllers/auth.controller';
import { CompanyController } from '@controllers/company.controller';
import { Router } from 'express';
import { container } from 'tsyringe';

const router = Router();

const authController = container.resolve(AuthController);
const companyController = container.resolve(CompanyController);

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

router.post('/company/:id', (request, response) => {
  companyController.updateCompany(request, response);
});

router.delete('/company/:id', (request, response) => {
  companyController.deleteCompany(request, response);
});

export { router };

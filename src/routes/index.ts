import { AuthController } from '@controllers/auth.controller';
import { CompanyController } from '@controllers/company.controller';
import { CompanyRepository } from '@repositories/company.respository';
import { UserRepository } from '@repositories/interfaces/auth.repository';
import { EmailSender } from '@services/email';
import { Router } from 'express';

const router = Router();

const userRepository = new UserRepository();
const emailSender = new EmailSender();
const authController = new AuthController(userRepository, emailSender);

const companyRepository = new CompanyRepository();
const companyController = new CompanyController(companyRepository);

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

router.get('company', (request, response) => {
  companyController.getCompanyList(request, response);
});

export { router };

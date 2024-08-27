import { AuthController } from '@controllers/auth/auth.controller';
import { Router } from 'express';
import { container } from 'tsyringe';

const authRoute = Router();
const version = 'v1';

const authController = container.resolve(AuthController);

authRoute.post(`/${version}/login`, (request, response) => {
  authController.loginUser(request, response);
});

authRoute.post(`/${version}/signup`, (request, response) => {
  authController.createNewUser(request, response);
});

authRoute.get(`/${version}/email-validation`, (request, response) => {
  authController.confirmUserValidation(request, response);
});

authRoute.post(`/${version}/reset-password`, (request, response) => {
  authController.getNewEmailValidation(request, response);
});

authRoute.post(`/${version}/new-password`, (request, response) => {
  authController.resetPassword(request, response);
});

export { authRoute };

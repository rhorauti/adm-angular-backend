import { CompanyController } from '@controllers/company/company.controller';
import Router, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { container } from 'tsyringe';

const companyRoute = Router();
const version = 'v1';

const companyController = container.resolve(CompanyController);

const createBodyChain = () => {
  return [
    body('[0].type').notEmpty().isNumeric().withMessage('Informe um valor válido!'),
    body('[0].nickname').notEmpty().withMessage('O campo nickname não pode estar vazio!'),
    body('[0].name').notEmpty().withMessage('O campo nome da empresa não pode estar vazio!'),
    body('[0].cnpj').notEmpty().withMessage('O campo CNPJ não pode estar vazio!'),
  ];
};

companyRoute.get(
  `/${version}/company`,
  (request: Request, response: Response, next: NextFunction) => {
    companyController.getCompanyList(request, response, next);
  },
);

companyRoute.post(
  `/${version}/company`,
  createBodyChain(),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      const firstErrorMessage = errors.array()[0].msg;
      return response.status(400).json({ status: false, msg: firstErrorMessage });
    }
    next();
  },
  (request: Request, response: Response, next: NextFunction) => {
    companyController.addNewCompany(request, response, next);
  },
);

companyRoute.put(
  `/${version}/company/:idCompany`,
  createBodyChain(),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      const firstErrorMessage = errors.array()[0].msg;
      return response.status(400).json({ status: false, msg: firstErrorMessage });
    }
    next();
  },
  (request: Request, response: Response, next: NextFunction) => {
    companyController.updateCompany(request, response, next);
  },
);

companyRoute.delete(
  `/${version}/company/:idCompany`,
  (request: Request, response: Response, next: NextFunction) => {
    companyController.deleteCompany(request, response, next);
  },
);

export { companyRoute };

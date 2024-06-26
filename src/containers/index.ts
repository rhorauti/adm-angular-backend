import { AuthController } from '@controllers/auth.controller';
import { CompanyController } from '@controllers/company.controller';
import { AuthRepository } from '@repositories/auth.repository';
import { CompanyRepository } from '@repositories/company.respository';
import { EmailSender } from '@services/email';
import JwtHandler from '@services/jwtService';
import { container } from 'tsyringe';

container.registerSingleton('AuthController', AuthController);
container.registerSingleton('CompanyController', CompanyController);
container.registerSingleton('AuthRepository', AuthRepository);
container.registerSingleton('CompanyRepository', CompanyRepository);
container.registerSingleton('JwtHandler', JwtHandler);
container.registerSingleton('EmailSender', EmailSender);

import { AuthController } from '@controllers/auth/auth.controller';
import { AddressController } from '@controllers/address/address.controller';
import { CompanyController } from '@controllers/company/company.controller';
import { Address } from '@src/models/address/address';
import { Company } from '@models/company/company';
import { Employee } from '@models/employee/employee';
import { Project } from '@models/project/project';
import { AddressRepository } from '@repositories/address/address.repository';
import { AuthRepository } from '@repositories/auth/auth.repository';
import { CompanyRepository } from '@repositories/company/company.respository';
import { EmailSender } from '@services/email.service';
import JwtHandler from '@services/jwt.service';
import { container } from 'tsyringe';
import { EmployeeRepository } from '@repositories/employee/employee.repository';
import { EmployeeController } from '@controllers/employee/employee.controller';

export type modelsBase = Company | Address | Project | Employee;

container.registerSingleton('AuthRepository', AuthRepository);
container.registerSingleton('AuthController', AuthController);
container.registerSingleton('CompanyRepository', CompanyRepository);
container.registerSingleton('CompanyController', CompanyController);
container.registerSingleton('AddressRepository', AddressRepository);
container.registerSingleton('AddressController', AddressController);
container.registerSingleton('EmployeeRepository', EmployeeRepository);
container.registerSingleton('EmployeeController', EmployeeController);
container.registerSingleton('JwtHandler', JwtHandler);
container.registerSingleton('EmailSender', EmailSender);

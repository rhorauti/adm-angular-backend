import { AuthController } from '@controllers/auth/auth.controller';
import { BaseController } from '@controllers/base/base.register.controller';
import { CompanyController } from '@controllers/company/company.controller';
import { Address } from '@models/adress/address';
import { Company } from '@models/company/company';
import { Employee } from '@models/employee/employee';
import { Project } from '@models/project/project';
import { AuthRepository } from '@repositories/auth/auth.repository';
import { BaseRepository } from '@repositories/base/base.repository';
import { CompanyRepository } from '@repositories/company/company.respository';
import { EmailSender } from '@services/email.service';
import JwtHandler from '@services/jwt.service';
import { container } from 'tsyringe';

export type modelsBase = Company | Address | Project | Employee;

container.registerSingleton('AuthController', AuthController);
container.registerSingleton('CompanyController', CompanyController);
container.registerSingleton('AuthRepository', AuthRepository);
container.registerSingleton('CompanyRepository', CompanyRepository);
container.registerSingleton('JwtHandler', JwtHandler);
container.registerSingleton('EmailSender', EmailSender);

container.register<BaseRepository<Address>>('BaseRepository<Address>', {
  useFactory: () => new BaseRepository(Address),
});
container.register<BaseRepository<Project>>('BaseRepository<Project>', {
  useFactory: () => new BaseRepository(Project),
});
container.register<BaseRepository<Employee>>('BaseRepository<Employee>', {
  useFactory: () => new BaseRepository(Employee),
});

container.register<BaseController<Address>>('BaseController<Address>', {
  useFactory: c => new BaseController<Address>(c.resolve('BaseRepository<Address>')),
});
container.register<BaseController<Project>>('BaseController<Project>', {
  useFactory: c => new BaseController<Project>(c.resolve('BaseRepository<Project>')),
});
container.register<BaseController<Employee>>('BaseController<Employee>', {
  useFactory: c => new BaseController<Employee>(c.resolve('BaseRepository<Employee>')),
});

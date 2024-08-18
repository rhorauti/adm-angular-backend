import { AddressController } from '@controllers/adress.controller';
import { AuthController } from '@controllers/auth.controller';
import { BaseController } from '@controllers/base.controller';
import { CompanyController } from '@controllers/company.controller';
import { ProjectController } from '@controllers/project.controller';
import { Address } from '@models/adress/address';
import { Company } from '@models/company/company';
import { Employee } from '@models/employee/employee';
import { Project } from '@models/project/project';
import { AddressRepository } from '@repositories/adress.repository';
import { AuthRepository } from '@repositories/auth.repository';
import { BaseRepository } from '@repositories/base.repository';
import { CompanyRepository } from '@repositories/company.respository';
import { ProjectRepository } from '@repositories/project.respository';
import { EmailSender } from '@services/email';
import JwtHandler from '@services/jwtService';
import { container } from 'tsyringe';

export type modelsBase = Company | Address | Project | Employee;

container.registerSingleton('AuthController', AuthController);
container.registerSingleton('CompanyController', CompanyController);
container.registerSingleton('AuthRepository', AuthRepository);
container.registerSingleton('CompanyRepository', CompanyRepository);
container.registerSingleton('JwtHandler', JwtHandler);
container.registerSingleton('EmailSender', EmailSender);
container.registerSingleton('AddressRepository', AddressRepository);
container.registerSingleton('AddressController', AddressController);
container.registerSingleton('ProjectRepository', ProjectRepository);
container.registerSingleton('ProjectController', ProjectController);

// container.register<BaseRepository<Project>>('BaseRepository<Project>', BaseRepository<Project>);
// container.register<BaseRepository<Employee>>('BaseRepository<Employee>', BaseRepository<Employee>);
// container.register<BaseRepository<Address>>('BaseRepository<Address>', BaseRepository<Address>);

// container.register<BaseController<Project>>('BaseController<Project>', BaseController<Project>);
// container.register<BaseController<Employee>>('BaseController<Employee>', BaseController<Employee>);
// container.register<BaseController<Address>>('BaseController<Address>', BaseController<Address>);

container.register<BaseRepository<Address>>('BaseRepository<Address>', {
  useFactory: () => new BaseRepository(Address),
});
container.register<BaseRepository<Project>>('BaseRepository<Project>', {
  useFactory: () => new BaseRepository(Project),
});
container.register<BaseRepository<Employee>>('BaseRepository<Employee>', {
  useFactory: () => new BaseRepository(Employee),
});

// Register generic BaseController for different models
container.register<BaseController<Address>>('BaseController<Address>', {
  useFactory: (c) => new BaseController<Address>(c.resolve('BaseRepository<Address>')),
});
container.register<BaseController<Project>>('BaseController<Project>', {
  useFactory: (c) => new BaseController<Project>(c.resolve('BaseRepository<Project>')),
});
container.register<BaseController<Employee>>('BaseController<Employee>', {
  useFactory: (c) => new BaseController<Employee>(c.resolve('BaseRepository<Employee>')),
});

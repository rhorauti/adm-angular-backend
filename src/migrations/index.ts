import { DataSource } from 'typeorm';
import { CreateCompanyTable1718214462553 } from './1718214462553-CreateCompanyTable';
import { CreateUsersTable1703816465329 } from './1703816465329-CreateUsersTable';
import { Users } from '@models/auth/users';
import { Company } from '@models/company/company';
import { Employee } from '@models/employee/employee';
import { EmployeeContract } from '@models/employee/employeeContract';
import { EmployeeVacation } from '@models/employee/employeeVacation';
import { Invoice } from '@models/invoice/invoice';
import { Product } from '@models/product/product';
import { Production } from '@models/production/production';
import { Project } from '@models/project/project';
import { ProjectEvent } from '@models/project/projectEvent';
import { PurchasingOrder } from '@models/purchasing-order/purchasingOrder';
import { Address } from '@models/adress/address';
import { Asset } from '@models/asset/asset';
import { CreateEmployeeTable1720471263659 } from './1720471263659-CreateEmployeeTable';
import { CreateAdressTable1720647166251 } from './1720647166251-CreateAdressTable';
import { CreateProjectTable1720647957624 } from './1720647957624-CreateProjectTable';
import { CreateCompanyTypeTable1720716678201 } from './1720716678201-CreateCompanyTypeTable';
import { CompanyType } from '@models/company/companyType';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Rkazuo4474!',
  database: 'adm',
  entities: [
    Company,
    CompanyType,
    Users,
    Address,
    Asset,
    Employee,
    EmployeeContract,
    EmployeeVacation,
    Invoice,
    Product,
    Production,
    Project,
    ProjectEvent,
    PurchasingOrder,
  ],
  migrations: [
    CreateUsersTable1703816465329,
    CreateCompanyTable1718214462553,
    CreateEmployeeTable1720471263659,
    CreateAdressTable1720647166251,
    CreateProjectTable1720647957624,
    CreateCompanyTypeTable1720716678201,
  ],
});

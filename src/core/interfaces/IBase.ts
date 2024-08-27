import { Address } from '@models/adress/address';
import { Company } from '@models/company/company';
import { CompanyType } from '@models/company/companyType';
import { Employee } from '@models/employee/employee';
import { Project } from '@models/project/project';

export type AllEntities = Company | CompanyType | Address | Project | Employee;

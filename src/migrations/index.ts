import { DataSource } from 'typeorm';
import { CreateCompanyTable1718214462553 } from './1718214462553-CreateCompanyTable';
import { CreateUsersTable1703816465329 } from './1703816465329-CreateUsersTable';
import { Users } from '@models/users';
import { Company } from '@models/company';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Rkazuo4474!',
  database: 'atari',
  entities: [Company, Users],
  migrations: [CreateUsersTable1703816465329, CreateCompanyTable1718214462553],
});

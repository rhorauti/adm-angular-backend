import { DataSource } from 'typeorm';
import { Company } from '../models/company';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Rkazuo4474!',
  database: 'atari',
  entities: [Company],
  migrations: [],
});

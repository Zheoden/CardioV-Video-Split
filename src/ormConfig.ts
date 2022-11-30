import { DataSource } from 'typeorm';
import { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME } from './common/constants';

export const myDataSource = new DataSource({
  type: 'mariadb',
  host: DB_HOSTNAME,
  port: 3306,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: 'cardiov',
  entities: ['dist/entities/*.js'],
  synchronize: false,
});

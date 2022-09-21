import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'cardiov',
  entities: ['dist/entities/*.js'],
  synchronize: true,
});

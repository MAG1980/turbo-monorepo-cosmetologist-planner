import { DataSourceOptions } from 'typeorm';
// import { connectionOptions } from '@server/config/connection.options';
import { connectionOptions } from './connection.options';

export const dataSourceOptions: DataSourceOptions = {
  ...connectionOptions,
  // entities: ["src/entity/*.ts"],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
};

export default dataSourceOptions;

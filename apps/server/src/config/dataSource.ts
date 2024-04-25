import { DataSource } from 'typeorm';
import dataSourceOptions from './dataSource.options';

const AppDataSource = new DataSource({
  ...dataSourceOptions(),
});

AppDataSource.initialize();
export default AppDataSource;

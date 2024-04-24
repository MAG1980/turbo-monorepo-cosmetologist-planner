import { DataSource } from 'typeorm';
import dataSourceOptions from './dataSource.options';

const AppDataSource = new DataSource({
  ...dataSourceOptions(),
});

export default AppDataSource.initialize();

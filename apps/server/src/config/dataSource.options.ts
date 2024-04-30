import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

//По умолчанию dotenv ищет файл в корневой папке приложения
//Расчёт пути к файлу ведётся относительно корневой папки приложения (server)
config({
  path: '../../.env',
});
export const dataSourceOptions = (): DataSourceOptions => ({
  type: 'cockroachdb',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: true,
  timeTravelQueries: false,
  logging: true,

  // entities: ["src/entity/*.ts"],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
});

export default dataSourceOptions;

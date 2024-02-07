import { DataSourceOptions } from 'typeorm';
import { config } from "dotenv";

config()
export const dataSourceOptions = (): DataSourceOptions => ({
  type: 'cockroachdb',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: true,
  timeTravelQueries: false,

  // entities: ["src/entity/*.ts"],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
});

export default dataSourceOptions;

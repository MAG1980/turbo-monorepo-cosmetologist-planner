import process from 'process';
import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config({
  path: '../../.env',
});
export const connectionOptions: DataSourceOptions = {
  type: 'cockroachdb',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: true,
  timeTravelQueries: false,
};

//Рекомендованный документацией Cockroach способ подключения к БД
/*
const dbUrl = new URL(process.env.DATABASE_URL as string);
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

export const connectionOptions: CockroachConnectionOptions = {

 type: "cockroachdb",
    url: dbUrl.toString(),
    extra: {
      options: routingId
    },
    timeTravelQueries: false
}*/

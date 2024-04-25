import { NestFactory } from '@nestjs/core';
import { AppModule } from '@server/app.module';
import { DataSource } from 'typeorm';
import { seedData } from '@server/helpers/seeder/seed-data';

const runSeeder = async () => {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  await seedData(dataSource);
  await app.close();
};

runSeeder();

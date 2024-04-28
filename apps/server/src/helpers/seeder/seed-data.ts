import { DataSource } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { SeederService } from '@server/helpers/seeder/seeder.service';

export const seedData = async (
  dataSource: DataSource,
  app: INestApplication,
) => {
  //Пример получения DataSource
  console.log(dataSource.manager.connection.migrations);

  const seederService = app.get(SeederService);

  await seederService.run(3, 10, 15);
};

import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';
import { ClientRepository } from '@server/client/client.repository';
import { ProcedureRepository } from '@server/procedure/procedure.repository';
import { ReceptionRepository } from '@server/reception/reception.repository';
import { OrderRepository } from '@server/order/order.repository';
import { DataSource } from 'typeorm';

export const seedData = async (dataSource: DataSource) => {
  //Пример получения DataSource
  console.log(dataSource.manager);

  await ProcedureRepository.seed();
  await TimeIntervalRepository.seed();
  await ReceptionRepository.seed(150);
  await ClientRepository.seed(50);
  await OrderRepository.seed(1500);
};

import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';
import { ClientRepository } from '@server/client/client.repository';
import { ProcedureRepository } from '@server/procedure/procedure.repository';
import { ReceptionRepository } from '@server/reception/reception.repository';
import { OrderRepository } from '@server/order/order.repository';
import { DataSource } from 'typeorm';

export const seedData = async (dataSource: DataSource) => {
  //Пример получения DataSource
  console.log(dataSource.manager.connection.migrations);

  const procedureRepository = new ProcedureRepository(dataSource);
  const timeIntervalRepository = new TimeIntervalRepository(dataSource);
  const receptionRepository = new ReceptionRepository(
    dataSource,
    timeIntervalRepository,
  );
  const clientRepository = new ClientRepository(dataSource);
  const orderRepository = new OrderRepository(
    dataSource,
    clientRepository,
    procedureRepository,
    receptionRepository,
  );

  await procedureRepository.seed();
  await timeIntervalRepository.seed();
  await receptionRepository.seed(150);
  await clientRepository.seed(50);
  await orderRepository.seed(150);
};

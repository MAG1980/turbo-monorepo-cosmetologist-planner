import { OrderEntity } from '@server/order/entities/Order.entity';
import { DataSource } from 'typeorm';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';
import { ClientRepository } from '@server/client/client.repository';
import { ProcedureRepository } from '@server/procedure/procedure.repository';

export const seedData = async (dataSource: DataSource) => {
  const orderRepository = dataSource.getRepository(OrderEntity);
  console.log('OrderRepository', orderRepository);

  await TimeIntervalRepository.seed();

  await ClientRepository.seed(3);

  await ProcedureRepository.seed();
};

import { OrderEntity } from '@server/order/entities/Order.entity';
import { DataSource } from 'typeorm';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';
import { ClientRepository } from '@server/client/client.repository';

export const seedData = async (dataSource: DataSource) => {
  const orderRepository = dataSource.getRepository(OrderEntity);
  console.log('OrderRepository', orderRepository);

  await TimeIntervalRepository.seedTimeIntervals();

  await ClientRepository.seedClients(3);
};

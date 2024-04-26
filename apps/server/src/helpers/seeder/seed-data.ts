import { OrderEntity } from '@server/order/entities/Order.entity';
import { DataSource } from 'typeorm';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';
import { ClientRepository } from '@server/client/client.repository';
import { ProcedureRepository } from '@server/procedure/procedure.repository';
import { ReceptionRepository } from '@server/reception/reception.repository';
import { OrderRepository } from '@server/order/order.repository';

export const seedData = async (dataSource: DataSource) => {
  const orderRepository = dataSource.getRepository(OrderEntity);
  console.log('OrderRepository', orderRepository);

  await ProcedureRepository.seed();
  await TimeIntervalRepository.seed();
  await ReceptionRepository.seed(1);
  await ClientRepository.seed(0);
  await OrderRepository.seed(1);
};

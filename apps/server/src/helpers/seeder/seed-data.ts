import { OrderEntity } from '@server/order/entities/Order.entity';
import { DataSource } from 'typeorm';

export const seedData = async (dataSource: DataSource) => {
  const orderRepository = dataSource.getRepository(OrderEntity);

  console.log('orderRepository ', orderRepository);
};

import { OrderEntity } from '../../order/entities/Order.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<OrderEntity> {
  listenTo() {
    return OrderEntity;
  }

  afterInsert(event: InsertEvent<OrderEntity>) {
    console.log('Order created: ', event.entity);
  }
}

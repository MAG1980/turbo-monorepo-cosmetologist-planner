import { OrderEntity } from '@server/order/entities/Order.entity';
import { faker } from '@faker-js/faker';
import { OrderStatus } from '@server/order/enums/OrderStatus.enum';
import { ClientRepository } from '@server/client/client.repository';
import { ReceptionRepository } from '@server/reception/reception.repository';
import { ProcedureEntity } from '@server/procedure/entities/Procedure.entity';
import { ProcedureRepository } from '@server/procedure/procedure.repository';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly clientRepository: ClientRepository,
    private readonly procedureRepository: ProcedureRepository,
    private readonly receptionRepository: ReceptionRepository,
  ) {
    super(OrderEntity, dataSource.createEntityManager());
  }
  async seed(ordersAmount: number = 1) {
    try {
      const orders: OrderEntity[] = [];
      const clients = await this.clientRepository.getAllClients();
      let receptions = await this.receptionRepository.getAvailableReceptions();
      const procedures = await this.procedureRepository.find();

      for (let i = 0; i < ordersAmount; i++) {
        const order = new OrderEntity();
        order.status = faker.helpers.arrayElement(Object.values(OrderStatus));
        order.clientId = faker.helpers.arrayElement(clients).id;
        order.procedures = this.getRandomProcedures(procedures);

        const reception = faker.helpers.arrayElement(receptions);
        order.reception = reception;
        reception.available = false;
        await this.receptionRepository.updateAvailability(reception);

        receptions = receptions.filter(
          (r) =>
            r.date !== reception.date ||
            r.timeInterval !== reception.timeInterval,
        );

        orders.push(order);
      }
      await this.save(orders);
      console.log('Orders seeded!');
    } catch (error) {
      console.log('Something went wrong by seeding orders: ', error);
    }
  }

  getRandomProcedures(procedures: ProcedureEntity[]) {
    const availableProcedures = [...procedures];
    const getRandomProcedure = () => {
      return availableProcedures.splice(
        faker.number.int({ min: 0, max: availableProcedures.length - 1 }),
        1,
      )[0] as ProcedureEntity;
    };
    return Array.from(
      {
        length: faker.number.int({ min: 1, max: 3 }),
      },
      getRandomProcedure,
    );
  }

  getOrdersByClient(id: number) {
    return this.find({
      where: { clientId: id },
      relations: ['reception', 'procedures'],
    });
  }
}

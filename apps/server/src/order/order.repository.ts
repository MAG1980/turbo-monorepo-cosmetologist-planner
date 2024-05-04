import { OrderEntity } from '@server/order/entities/Order.entity';
import { faker } from '@faker-js/faker';
import { OrderStatus } from '@server/order/enums/OrderStatus.enum';
import { UserRepository } from '@server/user/user.repository';
import { ReceptionRepository } from '@server/reception/reception.repository';
import { ProcedureEntity } from '@server/procedure/entities/Procedure.entity';
import { ProcedureRepository } from '@server/procedure/procedure.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UpdateOrderDto } from '@server/order/dto/update-order.dto';
import { GetOrdersDto } from '@server/order/dto/get-orders.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.createEntityManager());
  }
  async seed(
    ordersAmount: number = 15,
    userRepository: UserRepository,
    receptionRepository: ReceptionRepository,
    procedureRepository: ProcedureRepository,
  ) {
    try {
      const orders: OrderEntity[] = [];
      const users = await userRepository.findAllEntities();
      let receptions = await receptionRepository.getAvailableReceptions();
      const procedures = await procedureRepository.find();

      for (let i = 0; i < ordersAmount; i++) {
        const order = new OrderEntity();
        order.status = faker.helpers.arrayElement(Object.values(OrderStatus));
        order.user = faker.helpers.arrayElement(users);
        order.procedures = this.getRandomProcedures(procedures);

        const reception = faker.helpers.arrayElement(receptions);
        order.reception = reception;
        reception.available = false;
        await receptionRepository.updateAvailability(reception);

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

  getOrdersByUser(id: number) {
    return this.find({
      where: { user: { id } },
      relations: ['reception', 'procedures'],
    });
  }

  createEntity(order: OrderEntity) {
    const entity = this.create(order);
    return this.save(entity);
  }

  async findAllEntities(
    getOrdersDto: GetOrdersDto,
    paginationOptions: IPaginationOptions,
  ) {
    const { userId, status, date, timeInterval, procedureId } = getOrdersDto;
    const queryBuilder = this.createQueryBuilder('order')
      .leftJoin('order.procedures', 'procedure')
      .select([
        'order.id',
        'order.user_id',
        'order.status',
        'order.reception_date',
        'order.reception_time_interval_id',
        'procedure.id',
        'procedure.name',
        'procedure.price',
      ])
      .orderBy('order.id', 'ASC');

    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    if (date) {
      queryBuilder.andWhere('order.reception_date = :date', { date });
    }

    if (timeInterval) {
      queryBuilder.andWhere(
        'order.reception_time_interval_id = :timeInterval',
        {
          timeInterval,
        },
      );
    }

    if (procedureId) {
      queryBuilder.andWhere('procedure.id = :procedureId', { procedureId });
    }

    if (userId) {
      queryBuilder.andWhere('order.user_id = :userId', { userId });
    }
    await queryBuilder.getRawMany();

    return paginate<OrderEntity>(queryBuilder, paginationOptions);
  }

  async findOneEntity(id: number) {
    const entity = await this.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Order with ID = ${id} is not found!`);
    }
    return entity;
  }

  updateEntity(id: number, updateOrderDto: UpdateOrderDto) {
    return this.update(id, updateOrderDto);
  }

  removeEntity(id: number) {
    return this.delete(id);
  }
}

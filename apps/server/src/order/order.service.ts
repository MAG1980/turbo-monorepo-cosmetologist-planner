import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@server/order/order.repository';
import { OrderEntity } from '@server/order/entities/Order.entity';
import { ReceptionEntity } from '@server/reception/entities/Reception.entity';
import { DataSource, In } from 'typeorm';
import { ProcedureEntity } from '@server/procedure/entities/Procedure.entity';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import {
  CreateOrderDto,
  GetOrdersDto,
  UpdateOrderDto,
} from '@server/order/dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly orderRepository: OrderRepository,
  ) {}

  getOrdersByUser(id: number) {
    return this.orderRepository.getOrdersByUser(id);
  }

  async create(createOrderDto: CreateOrderDto) {
    const { userId, date, timeIntervalId, procedureIds } = createOrderDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const procedures = await queryRunner.manager.find(ProcedureEntity, {
        where: {
          id: In(procedureIds),
        },
      });

      const reception = {
        date,
        timeInterval: timeIntervalId,
      };

      const order = queryRunner.manager.create(OrderEntity, {
        user: { id: userId },
        procedures,
        reception,
      });

      const createdOrder = await queryRunner.manager.save(order);
      await queryRunner.manager.update(
        ReceptionEntity,
        { date, timeInterval: timeIntervalId },
        { available: false },
      );

      await queryRunner.commitTransaction();
      return { ...createdOrder, reception };
    } catch (error) {
      console.log(`Error by creating order: ${error}`);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(getOrdersDto: GetOrdersDto, paginationOptions: IPaginationOptions) {
    return this.orderRepository.findAllEntities(
      getOrdersDto,
      paginationOptions,
    );
  }

  findOne(id: number) {
    return this.orderRepository.findOneEntity(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.updateEntity(id, updateOrderDto);
  }

  remove(id: number) {
    return this.orderRepository.removeEntity(id);
  }
}

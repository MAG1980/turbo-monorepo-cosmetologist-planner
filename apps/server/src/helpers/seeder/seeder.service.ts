import { Injectable } from '@nestjs/common';
import { ClientRepository } from '@server/client/client.repository';
import { OrderRepository } from '@server/order/order.repository';
import { ReceptionRepository } from '@server/reception/reception.repository';
import { ProcedureRepository } from '@server/procedure/procedure.repository';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';

@Injectable()
export class SeederService {
  constructor(
    private readonly procedureRepository: ProcedureRepository,
    private readonly timeIntervalRepository: TimeIntervalRepository,
    private readonly receptionRepository: ReceptionRepository,
    private readonly clientRepository: ClientRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async run(daysAmount = 5, clientsAmount = 5, ordersAmount = 15) {
    await this.procedureRepository.seed();
    await this.timeIntervalRepository.seed();
    await this.receptionRepository.seed(
      daysAmount,
      this.timeIntervalRepository,
    );
    await this.clientRepository.seed(clientsAmount);
    await this.orderRepository.seed(
      ordersAmount,
      this.clientRepository,
      this.receptionRepository,
      this.procedureRepository,
    );
  }
}

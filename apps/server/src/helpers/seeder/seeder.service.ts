import { Injectable } from '@nestjs/common';
import { UserRepository } from '@server/user/user.repository';
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
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async run(daysAmount = 5, usersAmount = 5, ordersAmount = 15) {
    await this.procedureRepository.seed();
    await this.timeIntervalRepository.seed();
    await this.receptionRepository.seed(
      daysAmount,
      this.timeIntervalRepository,
    );
    await this.userRepository.seed(usersAmount);
    await this.orderRepository.seed(
      ordersAmount,
      this.userRepository,
      this.receptionRepository,
      this.procedureRepository,
    );
  }
}

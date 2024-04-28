import { Injectable } from '@nestjs/common';
import { ReceptionRepository } from '@server/reception/reception.repository';

@Injectable()
export class ReceptionService {
  constructor(public readonly receptionRepository: ReceptionRepository) {}
  getReceptionsByTimeInterval(timeInterval: number) {
    return this.receptionRepository.getReceptionsByTimeInterval(timeInterval);
  }

  getAvailableReceptionsByDate(date: string) {
    return this.receptionRepository.getAvailableReceptionsByDate(date);
  }

  getReceptionsByDateAndTimeInterval(date: string, timeInterval: string) {
    return this.receptionRepository.getReceptionsByDateAndTimeInterval(
      date,
      timeInterval,
    );
  }
}

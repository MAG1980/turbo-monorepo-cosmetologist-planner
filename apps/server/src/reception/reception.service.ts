import { Injectable } from '@nestjs/common';
import { ReceptionRepository } from '@server/reception/reception.repository';

@Injectable()
export class ReceptionService {
  getReceptionsByTimeInterval(timeInterval: number) {
    return ReceptionRepository.getReceptionsByTimeInterval(timeInterval);
  }

  getAvailableReceptionsByDate(date: string) {
    return ReceptionRepository.getAvailableReceptionsByDate(date);
  }

  getReceptionsByDateAndTimeInterval(date: string, timeInterval: string) {
    return ReceptionRepository.getReceptionsByDateAndTimeInterval(
      date,
      timeInterval,
    );
  }
}

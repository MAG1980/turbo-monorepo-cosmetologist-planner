import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import moment from "moment-timezone";
import { ReceptionEntity } from "@server/reception/entities/Reception.entity";



@Injectable()
export class ReceptionService {
    constructor(
      @InjectRepository(ReceptionEntity)
      private readonly receptionRepository: Repository<ReceptionEntity> ) {}


 seedReceptions() {
try {
  const receptions = [];
  for (let i = 0; i < 3; i++) {
    const date = moment.tz(`2024-04-${13 + i}T06:00:00`, 'Europe/Moscow')
      .format();

    for (let j = 0; j < 16; j++) {
      const reception = new ReceptionEntity()
      reception.date = date
      reception.timeInterval = j
      receptions.push(reception)
    }
  }

  this.receptionRepository.save(receptions)
}catch(error){
     console.log(error)
   }
}
}

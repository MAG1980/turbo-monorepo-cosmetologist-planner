import { Module } from '@nestjs/common';
import { ProcedureService } from './procedure.service';
import { ProcedureController } from './procedure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedureEntity } from '@server/procedure/entities/Procedure.entity';
import { ProcedureRepository } from '@server/procedure/procedure.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProcedureEntity])],
  providers: [ProcedureService, ProcedureRepository],
  controllers: [ProcedureController],
})
export class ProcedureModule {}

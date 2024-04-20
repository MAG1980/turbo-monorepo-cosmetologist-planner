import { Module } from '@nestjs/common';
import { ProcedureService } from './procedure.service';
import { ProcedureController } from './procedure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedureEntity } from '@server/procedure/entities/Procedure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcedureEntity])],
  providers: [ProcedureService],
  controllers: [ProcedureController],
})
export class ProcedureModule {}

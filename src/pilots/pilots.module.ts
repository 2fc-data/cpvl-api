import { Module } from '@nestjs/common';
import { PilotsController } from './pilots.controller';
import { PilotsService } from './pilots.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pilots } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([Pilots])],
  controllers: [PilotsController],
  providers: [PilotsService],
})
export class PilotsModule {}

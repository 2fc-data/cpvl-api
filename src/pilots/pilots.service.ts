import { Injectable } from '@nestjs/common';
import { Pilots } from 'models';

@Injectable()
export class PilotsService {
  async getInfo(cpf: string): Promise<Pilots | null> {
    return Pilots.findOne({ where: { cpf } });
  }

  async addPilot(info: Pilots) {
    return Pilots.upsert(info);
  }
}

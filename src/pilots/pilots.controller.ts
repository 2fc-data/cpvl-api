import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { Roles } from 'decorators';
import { Response } from 'express';
import { PilotsService } from './pilots.service';
import { ERoles, PassportRequest } from '../types';
import { Pilots } from 'models';

@Controller({
  path: 'pilots',
})
export class PilotsController {
  constructor(private pilotsService: PilotsService) {}

  @Get('/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERoles.FISCAL)
  async getStatus(@Req() req: PassportRequest, @Res() res: Response) {
    res.json('ok');
  }

  @Post('/pilot')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERoles.PILOTO)
  async addPilot(@Body() pilotInfo: Pilots, @Res() res: Response) {
    const [info, newRecord] = await this.pilotsService.addPilot(pilotInfo);
    res.json({ info, newRecord });
  }

  @Get('/pilot/:cpf')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERoles.PILOTO)
  async getInfo(@Param('cpf') cpf: string, @Res() res: Response) {
    const pilot = await this.pilotsService.getInfo(cpf);
    if (!pilot) {
      return res
        .status(201)
        .json({ message: 'Nenhum piloto encontrado para o CPF informado.' });
    }
    res.json(pilot);
  }
}

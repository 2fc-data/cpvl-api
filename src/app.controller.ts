import { Controller, Req, Res, Post, UseGuards, Get } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './auth/guards/auth.local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { PassportRequest } from 'types';
import { RolesGuard } from 'auth/guards/roles.guard';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: PassportRequest, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    const tokenName = this.configService.get<string>('TOKEN_NAME');
    res.cookie(tokenName, token, { httpOnly: true });
    res.send({ status: 'ok' });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  async getProfile(@Req() req: PassportRequest, @Res() res: Response) {
    const userRole = req.user.role;
    const pages = {
      pilots: {
        label: 'Pilotos',
        route: 'pilots',
      },
      statusList: {
        label: 'Pilotos autorizados',
        route: 'status-list',
      },
    };

    const allowedPages = {
      admin: [...Object.keys(pages).map((key) => pages[key])],
      fiscal: [pages.statusList],
    };
    res.send(allowedPages[userRole] || []);
  }
}

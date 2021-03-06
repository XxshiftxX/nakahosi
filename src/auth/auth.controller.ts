import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth.login')
  async login(@Req() req: Request) {
    const { accessToken: access_token } = await this.authService.login(req.user);

    return { access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth.self')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}

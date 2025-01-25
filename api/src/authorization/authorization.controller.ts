import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { LoginAuthorizationDto } from './dto/login-authorization.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post('login')
  login(@Body() loginAuthorizationDto: LoginAuthorizationDto) {
    return this.authorizationService.login(loginAuthorizationDto);
  }

  @Post('register')
  create(@Body() createAuthorizationDto: CreateAuthorizationDto) {
    return this.authorizationService.create(createAuthorizationDto);
  }

  @Get('getUser')
  @UseGuards(JwtAuthGuard)
  getUser(@Req() request: Request) {
    const token = request.headers?.authorization?.split(' ')[1] as string;
    return this.authorizationService.getUser(token);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MovementsService } from './movements.service';
import { Movement } from './schemas/movements.schema';
import { JwtAuthGuard } from '../authorization/jwt-auth.guard';
import { Request } from 'express';

@Controller('movements')
@UseGuards(JwtAuthGuard)
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post()
  async create(@Req() request: Request, @Body() movement: Movement) {
    const token = request.headers?.authorization?.split(' ')[1] as string;
    return this.movementsService.create(movement, token);
  }

  @Get()
  async getMovementsByUser(@Req() request: Request) {
    const token = request.headers?.authorization?.split(' ')[1] as string;
    return this.movementsService.getMovementsByUser(token);
  }

  @Get('/capital')
  async getCapital(@Req() request: Request) {
    const token = request.headers?.authorization?.split(' ')[1] as string;
    return await this.movementsService.getCapital(token);
  }

  @Delete(':id')
  async remove(@Req() request: Request, @Param('id') id: string) {
    const token = request.headers?.authorization?.split(' ')[1] as string;
    return this.movementsService.remove(id, token);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MovementsService } from './movements.service';
import { Movement } from './schemas/movements.schema';
import { JwtAuthGuard } from '../authorization/jwt-auth.guard';

@Controller('movements')
@UseGuards(JwtAuthGuard)
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post()
  async create(@Body() movement: Movement): Promise<Movement> {
    return this.movementsService.create(movement);
  }

  @Get()
  async findAll(): Promise<Movement[]> {
    return this.movementsService.findAll();
  }

  @Get('/capital')
  async getCapital(): Promise<{ capital: number }> {
    const capital = await this.movementsService.getCapital();
    return { capital };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movement | null> {
    return this.movementsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Movement | null> {
    return this.movementsService.remove(id);
  }
}

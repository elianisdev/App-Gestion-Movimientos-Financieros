import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movement, MovementDocument } from './schemas/movements.schema';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
  ) {}

  async create(movement: Movement): Promise<Movement> {
    const createdMovement = new this.movementModel(movement);
    return createdMovement.save();
  }

  async findAll(): Promise<Movement[]> {
    return this.movementModel.find().exec();
  }

  async findOne(id: string): Promise<Movement | null> {
    return this.movementModel.findById(id).exec();
  }

  async remove(id: string): Promise<Movement | null> {
    return this.movementModel.findByIdAndDelete(id).exec();
  }

  async getCapital(): Promise<number> {
    const movements = await this.findAll();
    return movements.reduce((capital, movement) => {
      return movement.type === 'Ingreso'
        ? capital + movement.amount
        : capital - movement.amount;
    }, 0);
  }
}

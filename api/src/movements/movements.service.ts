import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movement, MovementDocument } from './schemas/movements.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
    private jwtService: JwtService,
  ) {}

  async create(movement: Movement, token: string) {
    const payload = this.jwtService.verify(token);
    const userId = payload.sub;
    const createdMovement = new this.movementModel({ ...movement, userId });
    const movementResult = await createdMovement.save();
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Movimiento creado correctamente!',
      movement: movementResult,
    };
  }

  async remove(id: string, token: string) {
    const payload = this.jwtService.verify(token);
    const userId = payload.sub;
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
    const movement = await this.movementModel
      .findOne({ _id: id, userId })
      .exec();
    if (!movement) {
      throw new HttpException(
        'No estas autorizado para eliminar este movimiento',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const resultDelete = await this.movementModel.findByIdAndDelete(id).exec();
    return {
      statusCode: HttpStatus.OK,
      message: 'Movimiento eliminado correctamente!',
      movement: resultDelete,
    };
  }

  async getCapital(token: string) {
    const payload = this.jwtService.verify(token);
    const userId = payload.sub;
    const movements = await this.movementModel.find({ userId }).exec();
    const totalCapital = movements.reduce((capital, movement) => {
      return movement.type === 'Ingreso'
        ? capital + movement.amount
        : capital - movement.amount;
    }, 0);
    return {
      statusCode: HttpStatus.OK,
      message: 'Capital obtenido correctamente!',
      capital: totalCapital,
    };
  }

  async getMovementsByUser(token: string) {
    const payload = this.jwtService.verify(token);
    const userId = payload.sub;
    const userMovements = await this.movementModel.find({ userId }).exec();
    return {
      statusCode: HttpStatus.OK,
      message: 'Movimientos obtenidos correctamente!',
      movements: userMovements,
    };
  }
}

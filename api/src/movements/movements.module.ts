import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { Movement, MovementSchema } from './schemas/movements.schema';
import { AuthorizationModule } from '../authorization/authorization.module';

@Module({
  imports: [
    AuthorizationModule,
    MongooseModule.forFeature([
      { name: Movement.name, schema: MovementSchema },
    ]),
  ],
  controllers: [MovementsController],
  providers: [MovementsService],
})
export class MovementsModule {}

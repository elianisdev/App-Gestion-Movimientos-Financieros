import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovementDocument = Movement & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: false },
  toObject: { virtuals: false },
})
export class Movement {
  @Prop({ required: true })
  type: 'Ingreso' | 'Egreso';

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: new Date() })
  date: Date;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);

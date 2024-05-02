/* import { AHealth } from '@/core/entities/Health'; */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';

export type HealthDocument = Health & Document;

@Schema()
export class Health /* implements AHealth */ {
  @Prop({ required: true })
  id: UUID;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  version: string;
}

export const HealthSchema = SchemaFactory.createForClass(Health);

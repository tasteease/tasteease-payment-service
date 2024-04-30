import { ACheckout } from '@/core/entities/Checkout';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';

export type Checkoutcument = Checkout & Document;

@Schema()
export class Checkout implements ACheckout {
  @Prop({ required: true, unique: true })
  id: UUID;

  @Prop({ required: true })
  paymentId: UUID;

  @Prop({ required: true })
  clientId: UUID;

  @Prop({ required: true, default: 0 })
  amount: number;

  @Prop({ required: true, default: '' })
  paymentLink: string;

  @Prop({ required: true, default: 'pending' })
  status: string;

  @Prop({ required: true, default: false })
  paid: boolean;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);

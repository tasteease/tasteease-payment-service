/* import { ACheckout } from '@/core/entities/Checkout'; */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CheckoutDocument = Checkout & Document;

@Schema()
export class Checkout /* implements ACheckout */ {
  @Prop({ type: String, required: true, unique: true })
  orderId: string;

  @Prop({ required: true })
  paymentId: string;

  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
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

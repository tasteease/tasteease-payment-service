import { UUID } from 'crypto';

export class Checkout {
  id: UUID;
  paymentId: UUID;
  clientId: UUID;
  amount: number;
  paymentLink: string;
  status: string;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(checkout: Partial<Checkout>) {
    Object.assign(this, checkout);
  }
}

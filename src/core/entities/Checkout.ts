export class Checkout {
  orderId: string;
  paymentId: string;
  clientId: string;
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

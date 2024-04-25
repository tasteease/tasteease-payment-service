import { UUID } from 'crypto';

abstract class ACheckout {
  abstract id: UUID;
  abstract paymentId: UUID;
  abstract clientId: UUID;
  abstract amount: number;
  abstract paymentLink: string;
  abstract status: string;
  abstract createdAt: Date;
  abstract updatedAt: Date;
}

export class Checkout implements ACheckout {
  id: UUID;
  paymentId: UUID;
  clientId: UUID;
  amount: number;
  paymentLink: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(checkout: Partial<ACheckout>) {
    Object.assign(this, checkout);
  }

  get getId(): UUID {
    return this.id;
  }

  set setId(id: UUID) {
    this.id = id;
  }

  get getPaymentId(): UUID {
    return this.paymentId;
  }

  set setPaymentId(paymentId: UUID) {
    this.paymentId = paymentId;
  }

  get getClientId(): UUID {
    return this.clientId;
  }

  set setClientId(clientId: UUID) {
    this.clientId = clientId;
  }

  get getAmount(): number {
    return this.amount;
  }

  set setAmount(amount: number) {
    this.amount = amount;
  }

  get getPaymentLink(): string {
    return this.paymentLink;
  }

  set setPaymentLink(paymentLink: string) {
    this.paymentLink = paymentLink;
  }

  get getStatus(): string {
    return this.status;
  }

  set setStatus(status: string) {
    this.status = status;
  }

  get getCreatedAt(): Date {
    return this.createdAt;
  }

  set setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  get getUpdatedAt(): Date {
    return this.updatedAt;
  }

  set setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
  }
}

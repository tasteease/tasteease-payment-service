import { UUID } from 'crypto';

export class Health {
  id: UUID;
  status: string;
  version: string;

  constructor(health: Partial<Health>) {
    Object.assign(this, health);
  }
}

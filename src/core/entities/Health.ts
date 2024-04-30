import { UUID } from 'crypto';

export abstract class AHealth {
  abstract id: UUID;
  abstract status: string;
  abstract version: string;
}

export class Health implements AHealth {
  id: UUID;
  status: string;
  version: string;

  constructor(health: Partial<AHealth>) {
    Object.assign(this, health);
  }

  get getStatus(): string {
    return this.status;
  }

  set setStatus(status: string) {
    this.status = status;
  }

  get getVersion(): string {
    return this.version;
  }

  set setVersion(version: string) {
    this.version = version;
  }
}

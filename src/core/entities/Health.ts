abstract class AHealth {
  abstract status: string;
  abstract version: string;
}

export class Health implements AHealth {
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

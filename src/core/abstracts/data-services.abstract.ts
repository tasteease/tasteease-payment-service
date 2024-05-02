import { Health } from '@/core/entities/Health';
import { Checkout } from '@/core/entities/Checkout';
import { ARepository } from './repository.abstract';

export abstract class IDataServices {
  abstract checkouts: ARepository<Checkout>;
  abstract healths: ARepository<Health>;
}

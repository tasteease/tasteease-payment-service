export abstract class ARepository<T> {
  abstract create(item: T): Promise<T>;
  abstract update(id: string, item: T);
  abstract get(id: string): Promise<T>;
  abstract getAll(): Promise<T[]>;
}

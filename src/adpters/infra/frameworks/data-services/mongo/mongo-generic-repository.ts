import { ARepository } from '@/core/abstracts/repository.abstract';
import { Model } from 'mongoose';

export class MongoGenericRepository<T> implements ARepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  getAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  get(id: string): Promise<T> {
    return this._repository.findOne({
      orderId: id,
    });
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(id: string, item: T) {
    return this._repository.updateOne({ orderId: id }, item);
  }
}

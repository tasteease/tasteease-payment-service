import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Checkout, Health, CheckoutDocument, HealthDocument } from './models';
import { IDataServices } from '@/core/abstracts/data-services.abstract';
import { MongoGenericRepository } from './mongo-generic-repository';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  checkouts: MongoGenericRepository<Checkout>;
  healths: MongoGenericRepository<Health>;

  constructor(
    @InjectModel(Checkout.name)
    private CheckoutRepository: Model<CheckoutDocument>,
    @InjectModel(Health.name)
    private HealthRepository: Model<HealthDocument>,
  ) {}

  onApplicationBootstrap() {
    this.checkouts = new MongoGenericRepository<Checkout>(
      this.CheckoutRepository,
    );
    this.healths = new MongoGenericRepository<Health>(this.HealthRepository);
  }
}

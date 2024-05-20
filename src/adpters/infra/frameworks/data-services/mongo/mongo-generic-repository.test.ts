import { Model } from 'mongoose';
import { MongoGenericRepository } from './mongo-generic-repository';

describe('MongoGenericRepository', () => {
  let repository: MongoGenericRepository<any>;
  let modelMock: Model<any>;

  beforeEach(() => {
    modelMock = {} as Model<any>;
    repository = new MongoGenericRepository(modelMock);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should call find method when getAll is called', async () => {
    modelMock.find = jest.fn().mockReturnValueOnce({
      populate: jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce([]),
      }),
    });

    await repository.getAll();

    expect(modelMock.find).toHaveBeenCalled();
  });

  it('should call findOne method when get is called', async () => {
    const id = '123';

    modelMock.findOne = jest.fn().mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(null),
    });

    await repository.get(id);

    expect(modelMock.findOne).toHaveBeenCalledWith({ orderId: id });
  });

  it('should call create method when create is called', async () => {
    const item = {};

    modelMock.create = jest.fn().mockResolvedValueOnce(item);

    await repository.create(item);

    expect(modelMock.create).toHaveBeenCalledWith(item);
  });

  it('should call updateOne method when update is called', async () => {
    const id = '123';
    const item = {};

    modelMock.updateOne = jest.fn().mockResolvedValueOnce({});

    await repository.update(id, item);

    expect(modelMock.updateOne).toHaveBeenCalledWith({ orderId: id }, item);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { GetHealthUseCase } from '../../../../core/use-cases/app/get-health.use-case';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [GetHealthUseCase],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('GIVEN acess to app controller', () => {
    describe('THEN make the GET request to "/"', () => {
      it('SHOULD return the application health.', async () => {
        const health = await appController.getHello();
        expect(health).toHaveProperty('error', false);
        expect(health).toHaveProperty('message', 'Health check');
        expect(health).toHaveProperty('data');
        expect(health.data).toHaveProperty('status', 'ok');
        expect(health.data).toHaveProperty('version', '1.0.0');
      });
    });
  });
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrap } from './main';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(() => ({
      listen: jest.fn(),
    })),
  },
}));

describe('main', () => {
  describe('GIVEN boostrap function', () => {
    it('should create an app and listen on port 3000', async () => {
      await bootstrap();

      expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    });
  });
});

import { GetHealthUseCase } from './get-health.use-case';
import { Health } from '@/core/entities/Health';

describe('GetHealthUseCase', () => {
  let useCase: GetHealthUseCase;

  beforeEach(() => {
    useCase = new GetHealthUseCase();
  });

  describe('GIVEN new instance of get health use case', () => {
    it('SHOULD return a health object with status "ok" and version "1.0.0"', async () => {
      const expectedHealth = new Health({
        status: 'ok',
        version: '1.0.0',
      });

      const result = await useCase.execute();

      expect(result).toEqual(expectedHealth);
    });
  });
});

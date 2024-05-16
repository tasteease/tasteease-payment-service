import { IApiResponseView } from './IApiResponseView';

describe('IApiResponseView', () => {
  it('should create an instance of IApiResponseView', () => {
    const response = new IApiResponseView<string>();

    expect(response).toBeInstanceOf(IApiResponseView);
  });

  it('should have correct properties', () => {
    const response = new IApiResponseView<string>();
    response.error = false;
    response.message = 'Payment successful';
    response.data = 'data';

    expect(response.error).toBe(false);
    expect(response.message).toBe('Payment successful');
    expect(response.data).toBe('data');
  });
});

export abstract class IHttpClientServices {
  abstract get<T>(url: string): Promise<T>;
  abstract post<T>(url: string, body: any): Promise<T>;
}

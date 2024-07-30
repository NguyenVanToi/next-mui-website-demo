export enum HTTPResponseCode {
  UNAUTHORIZED = 401
}

export interface IError {
  message: string;
  statusCode: number;
}

export interface IResponse<T> {
  data: T,
  statusCode?: number;
}
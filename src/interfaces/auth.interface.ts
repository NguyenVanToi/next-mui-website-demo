export interface IAuthLoginBodyRequest {
  email: string;
  password: string;
}

export interface IAuthLoginResponse {
  token: string
}
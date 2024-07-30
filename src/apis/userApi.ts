import { IAuthLoginBodyRequest, IAuthLoginResponse } from "@/interfaces/auth.interface";
import { IResponse } from "@/interfaces/http.interface";
import { IUser } from "@/interfaces/user.interface";
import api from "./api";

export const getUsers = async (): Promise<IResponse<IUser[]>> => {
  const url = "/users";
  return api.get(url);
};

export const login = async (email: string, password: string): Promise<IAuthLoginResponse> => {
  const url = "/users/login";
  const body: IAuthLoginBodyRequest = {
    email,
    password,
  };
  return api.post(url, body);
};

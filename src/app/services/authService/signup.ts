import { HttpClient } from "../httpClient";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  accessToken: string
}

export default async function signup(params: SignupParams) {
  const { data } = await HttpClient.post<SignupResponse>('/auth/signup', params);

  return data;
}

import { HttpClient } from "../HttpClient";

export interface SigninParams {
  email: string;
  password: string;
}

interface SigninResponse {
  accessToken: string
}

export default async function singin(params: SigninParams) {
  const { data } = await HttpClient.post<SigninResponse>('/auth/signin', params);

  return data;
}

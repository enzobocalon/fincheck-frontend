import { HttpClient } from "../httpClient";

interface MeResponse {
  name: string;
  email: string;
}

export default async function me() {
  const { data } = await HttpClient.get<MeResponse>('/users/me');

  return data;
}

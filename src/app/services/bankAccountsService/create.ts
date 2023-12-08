import { HttpClient } from "../httpClient";

export interface CreateBankAccountParams {
  name: string,
  initialBalance: number,
  color: string,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

export default async function create(params: CreateBankAccountParams) {
  const { data } = await HttpClient.post('/bank-accounts', params);

  return data;
}

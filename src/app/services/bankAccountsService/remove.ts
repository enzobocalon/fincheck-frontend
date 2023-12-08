import { HttpClient } from "../httpClient";

export async function remove(bankAccountId: string) {
  const { data } = await HttpClient.delete(`/bank-accounts/${bankAccountId}`);

  return data;
}

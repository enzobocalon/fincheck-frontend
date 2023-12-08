import { HttpClient } from "../httpClient";

export async function remove(transactionId: string) {
  const { data } = await HttpClient.delete(`/transactions/${transactionId}`);

  return data;
}

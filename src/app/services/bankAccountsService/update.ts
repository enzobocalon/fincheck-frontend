import { HttpClient } from "../httpClient";

export interface UpdateBankAccountParams {
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: "INVESTMENT" | "CHECKING" | "CASH";
}

export async function update({ id, ...params }: UpdateBankAccountParams) {
  const { data } = await HttpClient.put(`/bank-accounts/${id}`, params);

  return data;
}

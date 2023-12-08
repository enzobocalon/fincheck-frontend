import { HttpClient } from "../httpClient";

export interface UpdateTransactionsParams {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE";
}

export async function update({ id, ...params }: UpdateTransactionsParams) {
  const { data } = await HttpClient.put(`/transactions/${id}`, params);

  return data;
}

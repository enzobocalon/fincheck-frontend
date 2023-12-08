import { BankAccount } from "../../entities/BankAccount";
import { HttpClient } from "../httpClient";

type BankAccountsResponse = Array<BankAccount>;

export async function getAll() {
  const { data } = await HttpClient.get<BankAccountsResponse>("/bank-accounts");

  return data;
}

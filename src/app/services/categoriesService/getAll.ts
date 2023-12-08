import { Category } from "../../entities/Category";
import { HttpClient } from "../httpClient";

type CategoriesResponse = Array<Category>;

export async function getAll() {
  const { data } = await HttpClient.get<CategoriesResponse>("/categories");

  return data;
}

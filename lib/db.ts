import type { ProductFormData, ProductsResponse } from "@/app/types";
import { API_URL } from "@/lib/config";
import "server-only";

const defaultLimit = "6";

export async function getProducts() {
  const { products, total, page, pages, limit }: ProductsResponse = await fetch(
    `${API_URL}/products/?_limit=${defaultLimit}&_sort=id&_order=desc&_expand=category`,
  ).then((res) => res.json());

  return products;
}

export async function addProduct(newProduct: ProductFormData) {
  const res = await fetch(`${API_URL}/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  return res;
}

export async function updateProductById(id: string, product: ProductFormData) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  return res;
}

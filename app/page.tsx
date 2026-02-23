import Link from "next/link";
import { DeleteForm } from "@/components/delete-form";
import type { ProductsResponse } from "./types";

const API_URL = "http://localhost:4000";
const defaultLimit = "6";

export default async function Home() {
  // we use the fetch() method to get the products from the API
  // in this fetch we sort using _sort and _order and we limit the number of products using _limit
  // we also use _expand to get the relational category data
  // we can use the other destructed variables like page, total and so on to create pagination or show info
  const { products, total, page, pages, limit }: ProductsResponse = await fetch(
    `${API_URL}/products/?_limit=${defaultLimit}&_sort=id&_order=desc&_expand=category`,
  ).then((res) => res.json());

  console.log(products);

  return (
    <main className="grid">
      <header className="flex justify-between">
        <h1>Products</h1>
        <Link className="bg-neutral-200 rounded p-4" href="/products/create">
          Add Product
        </Link>
      </header>
      <div>
        {products.map((product) => (
          <div key={product.id} className="border-b flex gap-4">
            <h2>
              {product.title} - {product.category?.name}
            </h2>
            <Link href={`/products/edit/${product.id}`}>Edit</Link>
            <DeleteForm id={product.id.toString()} />
          </div>
        ))}
      </div>
    </main>
  );
}

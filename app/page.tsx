import type { ProductsResponse } from "./types";

export default async function Home() {

  const products: ProductsResponse  = await fetch("http://localhost:4000/products").then((res) =>
    res.json()
  );

console.log(products);

  return (
    <main>
      <h1>Products</h1>
      <div>{products.products.map((product) => <h2 key={product.id}>{product.title}</h2>)}</div>
    </main>
  );
}

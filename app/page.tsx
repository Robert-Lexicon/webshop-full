import Link from "next/link";
import { DeleteFormAlt } from "@/components/delete-form";
import { getProducts } from "@/lib/db";

export default async function Home() {
  // always better to move the fetching out to to a place where all our data fetching is done - a Data Access Layer
  const products = await getProducts();

  // the table should be a table,
  // I just don't want to spoil your process in making it :)
  return (
    <main className="container mx-auto grid px-8">
      <header className="flex justify-between">
        <h1>Products</h1>
        <Link className="bg-neutral-200 rounded p-4" href="/products/create">
          Add Product
        </Link>
      </header>
      <div>
        {products.map((product) => (
          <div key={product.id} className="border-b flex justify-between gap-4">
            <h2>
              {product.title} - {product.category?.name}
            </h2>
            <div className="flex gap-4">
              <DeleteFormAlt id={product.id.toString()} />
              <Link href={`/products/edit/${product.id}`}>Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

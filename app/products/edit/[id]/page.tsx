import type { Product } from "@/app/types";
import EditForm from "@/components/edit-form";
import { API_URL } from "@/lib/config";

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${API_URL}/products/${id}`);
  const product: Product = await res.json();

  return (
    <main className="container mx-auto">
      <h1>Edit product</h1>
      <EditForm product={product} />
    </main>
  );
}

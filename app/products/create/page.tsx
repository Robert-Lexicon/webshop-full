import Form from "next/form";
import CreateForm from "@/components/create-form";
import { addProduct } from "@/lib/actions";

export default function CreatePage() {
  return (
    <main className="container mx-auto">
      <h1>Create new product</h1>
      <CreateForm />
    </main>
  );
}

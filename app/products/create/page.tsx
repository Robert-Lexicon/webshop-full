import CreateForm from "@/components/create-form";
import CreateFormActionState from "@/components/create-form-action-state";

export default function CreatePage() {
  return (
    <main className="container mx-auto">
      <h1>Create new product</h1>
      <CreateFormActionState />
    </main>
  );
}

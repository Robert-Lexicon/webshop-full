"use client";
import Form from "next/form";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import {
  deleteProduct,
  deleteProductAlt,
  deleteProductBind,
} from "@/lib/actions";

// With bind we instead pass on/bind our id to the form and pass it along this way
// doing this we can skip the hidden input
// https://nextjs.org/docs/app/guides/forms#passing-additional-arguments
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

function DeleteButton() {
  // useFormStatus() is a hook that returns the status of the form so we can disable the button while the form is pending
  // this is to prevent double clicks and other issues
  // this hook will only return the status of a parent form,
  // so it needs to be declared as it's own component outside of the form
  // https://react.dev/reference/react-dom/hooks/useFormStatus
  const { pending } = useFormStatus();
  return (
    <button
      className="cursor-pointer disabled:cursor-not-allowed"
      disabled={pending}
      type="submit"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}

// Here we pass the formData along and get the id from that in the action
// We can't return values from the server action so we can't use a toast or similarhere
export function DeleteForm({ id }: { id: string }) {
  return (
    <Form action={deleteProduct}>
      <input hidden readOnly name="id" value={id} />
      <DeleteButton />
    </Form>
  );
}

// With bind we instead pass on/bind our id to the form and pass it along this way
// doing this we can skip the hidden input
// https://nextjs.org/docs/app/guides/forms#passing-additional-arguments
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

export function DeleteFormBind({ id }: { id: string }) {
  const deleteWithBind = deleteProductBind.bind(null, id);
  return (
    <Form action={deleteWithBind}>
      <button className="hover:cursor-pointer" type="submit">
        Delete
      </button>
    </Form>
  );
}

// Here we pass the id from the props to the client action and then pass that along to the server action
// That way we can return values from the server action and use those to show a toast
export function DeleteFormAlt({ id }: { id: string }) {
  const clientAction = async () => {
    const res = await deleteProductAlt(id);

    if (!res) {
      toast.error("Product not deleted...");
    } else {
      toast.success("Product deleted");
    }
  };

  return (
    <Form action={clientAction}>
      <DeleteButton />
    </Form>
  );
}

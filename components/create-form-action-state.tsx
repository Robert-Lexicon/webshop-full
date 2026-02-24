"use client";
import Form from "next/form";
import { useActionState } from "react";
import { type ActionState, addProductActionState } from "@/lib/actions";
import type { ProductFormData } from "@/lib/types";

// we set the initial state to null
const initialState: ActionState = null;

// we use useActionState to get the state, formAction and pending
// useActionState is a hook that returns the state, formAction and pending
// formAction is the function that we pass to the form
// pending is a boolean that is true while the form is pending
export default function CreateFormActionState() {
  const [state, formAction, pending] = useActionState(
    addProductActionState,
    initialState,
  );

  // since state data is FormData (which is unknown) we need to cast it to ProductFormData
  const data = state?.data as ProductFormData;

  /// in the form we use the formAction to pass the data to the server action
  // we also use the state message to show a message to the user if needed
  // and the state.data to prefill the form if there was an error using defaultValue
  // we use the pending to disable the button while the form is pending

  // we use the key to force the form to re-render when the state changes
  // this isn't always needed, but sometimes it doesn't update properly otherwise
  return (
    <Form key={state?.timestamp} action={formAction} className="grid gap-4">
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
        <label className="font-semibold" htmlFor="title">
          Title
        </label>
        <input
          className="border p-2 bg-white"
          type="text"
          id="title"
          name="title"
          minLength={3}
          maxLength={20}
          defaultValue={data?.title}
          required
        />
        <label className="font-semibold" htmlFor="brand">
          Brand
        </label>
        <input
          className="border p-2 bg-white"
          type="text"
          id="brand"
          name="brand"
          defaultValue={data?.brand}
          required
        />
        <label className="font-semibold" htmlFor="price">
          Price
        </label>
        <input
          className="border p-2 bg-white "
          type="number"
          min="0.5"
          step="0.01"
          id="price"
          name="price"
          defaultValue={data?.price}
          required
        />
        <label className="font-semibold" htmlFor="stock">
          Stock
        </label>
        <input
          className="border p-2 bg-white"
          type="number"
          id="stock"
          name="stock"
          defaultValue={data?.stock}
          required
        />
        <label className="font-semibold" htmlFor="categoryId">
          Category ID
        </label>
        <input
          className="border p-2 bg-white"
          type="number"
          id="categoryId"
          name="categoryId"
          defaultValue={data?.categoryId}
          required
        />
        <label className="font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          className="border p-2 bg-white"
          id="description"
          name="description"
          minLength={5}
          maxLength={400}
          defaultValue={data?.description}
          required
        />
        <label className="font-semibold" htmlFor="thumbnail">
          Thumbnail
        </label>
        <input
          className="border p-2 bg-white"
          type="url"
          id="thumbnail"
          name="thumbnail"
          defaultValue={data?.thumbnail}
          required
        />
      </div>
      <button
        className="cursor-pointer disabled:cursor-not-allowed"
        disabled={pending}
        type="submit"
      >
        {pending ? "Saving..." : "Save"}
      </button>
      <p>{state?.message}</p>
    </Form>
  );
}

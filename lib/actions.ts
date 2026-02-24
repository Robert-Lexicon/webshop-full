"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { API_URL } from "@/lib/config";
import { addProduct, updateProductById } from "@/lib/db";
import type { ProductFormData } from "@/lib/types";

// ** Add Product Examples **

export async function addProductAction(formData: FormData) {
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const stock = formData.get("stock") as string;
  const brand = formData.get("brand") as string;

  // remap the formData to match our ProductFormData type
  const newProduct: ProductFormData = {
    title,
    brand,
    description,
    thumbnail,
    price: parseInt(price, 10),
    categoryId: parseInt(categoryId, 10),
    stock: parseInt(stock, 10),
  };

  const res = await addProduct(newProduct);
  if (!res.ok) {
    // not sure what to do here since we can't return values from the server action
    // we could throw an error or something maybe
  }

  // we can revalidate the path to make sure the cache is updated
  revalidatePath("/");

  // if we want to we can redirect to a different page afterwards
  // and use searchparams to pass a message
  redirect("/?status=success");
}

// this is just a type for the states in our ActionState
export type ActionState = {
  message: string;
  data: unknown;
  errors?: Record<string, string[]>;
  timestamp: number;
} | null;

// in this version we get the previous state and return the new state
// this way we can return error messages and the formData calling form if we want to
// first parameter is the previous state, second is the formData
// we use _ to ignore the previous state since we don't need it here
export async function addProductActionState(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const stock = formData.get("stock") as string;
  const brand = formData.get("brand") as string;

  const newProduct: ProductFormData = {
    title,
    brand,
    description,
    thumbnail,
    price: parseInt(price, 10),
    categoryId: parseInt(categoryId, 10),
    stock: parseInt(stock, 10),
  };

  // just an example of how we can return error messages and the formData calling form if we want to
  // we usually have a bit thought out error handling here ofc
  if (parseInt(categoryId, 10) > 90) {
    return {
      message: "Category should not be above 90",
      data: newProduct,
      timestamp: Date.now(), // timestamp is actually ok here and won't cause hydration errors since it's not used for anything else
    };
  }

  // we can do things here to see if we have a success or not
  const res = await addProduct(newProduct);
  if (!res.ok) {
    return {
      message: "Something went wrong... ",
      data: formData,
      timestamp: Date.now(),
    };
  }

  revalidatePath("/");
  redirect("/?status=success");
}

// ** Update Product Examples **

// classical approach with getting id from the formData
export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const stock = formData.get("stock") as string;
  const brand = formData.get("brand") as string;

  const newProduct = {
    title,
    brand,
    description,
    thumbnail,
    price: parseInt(price, 10),
    categoryId: parseInt(categoryId, 10),
    stock: parseInt(stock, 10),
  };

  const res = await updateProductById(id, newProduct);

  const data = await res.json();
  // we can do things here to see if we have a success or not later on
  console.log(data);

  revalidatePath("/");
  redirect("/?status=updated");
}

// Same as the other update product function, but here we pass the id with bind from the calling component
export async function updateProductBind(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const stock = formData.get("stock") as string;
  const brand = formData.get("brand") as string;

  const newProduct = {
    title,
    brand,
    description,
    thumbnail,
    price: parseInt(price, 10),
    categoryId: parseInt(categoryId, 10),
    stock: parseInt(stock, 10),
  };

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  const data = await res.json();
  console.log(data);

  revalidatePath("/");
  redirect("/");
}

// ** Delete Product Examples **

// Here we need to process the formData to get the id
export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;

  // these fetches should be moved out into our DAL instead
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  // If the response is not ok, throw an error, this is the only choice in this case
  if (!res.ok) throw new Error("Failed to delete product");

  // We can't return values from the server action so not much use of the data really...
  const data = await res.json();
  console.log(data);

  revalidatePath("");
}

// In this server action we get the id directly and pass that along to the API
export async function deleteProductBind(id: string) {
  // we could use try/catch here too if we want to
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete product");

  revalidatePath("");
}

// Only difference here is that we can validate and return a boolean to check for success or failure
export async function deleteProductAlt(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) return false;

  revalidatePath("");
  return true;
}

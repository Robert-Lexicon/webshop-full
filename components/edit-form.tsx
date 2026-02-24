import Form from "next/form";
import type { Category, Product } from "@/app/types";
import { updateProduct } from "@/lib/actions";
import { API_URL } from "@/lib/config";

export default async function EditForm({ product }: { product: Product }) {
  // one warning here, if we change this to a client component we need to pass the categories as a prop to it from the page or such
  const categories: Category[] = await fetch(`${API_URL}/categories`).then(
    (res) => res.json(),
  );

  // if we want to use bind we use this in our form action instead of updateProduct
  //const editWithBind = updateProductBind.bind(null, id)

  return (
    <Form action={updateProduct} className="grid gap-4">
      <input readOnly name="id" value={product.id} />
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
          defaultValue={product.title}
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
          defaultValue={product.brand}
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
          defaultValue={product.price}
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
          defaultValue={product.stock}
          required
        />
        <label className="font-semibold" htmlFor="categoryId">
          Category
        </label>
        <select
          id="category"
          name="categoryId"
          defaultValue={product.categoryId}
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {/* <input
            className="border p-2 bg-white"
            type="number"
            id="categoryId"
            name="categoryId"
            defaultValue={product.categoryId}
            required
          /> */}
        <label className="font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          className="border p-2 bg-white"
          id="description"
          name="description"
          minLength={5}
          maxLength={400}
          defaultValue={product.description}
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
          defaultValue={product.thumbnail}
          required
        />
      </div>
      <button type="submit">Save</button>
    </Form>
  );
}

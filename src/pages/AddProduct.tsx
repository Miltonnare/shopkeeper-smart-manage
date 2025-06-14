
import TopNav from "@/components/TopNav";
import { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({ name: "", price: "", stock: "" });
  const [added, setAdded] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setProduct({ name: "", price: "", stock: "" });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="max-w-md mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form
          onSubmit={handleAdd}
          className="bg-white p-8 rounded-xl shadow border space-y-6"
        >
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Product Name</label>
            <input
              name="name"
              required
              value={product.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 ring-primary"
              placeholder="E.g. Oil, Rice"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2 font-medium">Price</label>
              <input
                name="price"
                type="number"
                min={0}
                required
                value={product.price}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 ring-primary"
                placeholder="₹0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-2 font-medium">Stock Qty</label>
              <input
                name="stock"
                type="number"
                min={0}
                required
                value={product.stock}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 ring-primary"
                placeholder="0"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md hover:bg-blue-700 mt-2 transition-colors"
          >
            Add Product
          </button>
          {added && (
            <div className="text-green-600 mt-2 text-center animate-fade-in font-semibold">
              Product added ✓
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

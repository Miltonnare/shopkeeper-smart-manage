
import React from "react";

interface Product {
  id: string;
  name: string;
  stock: number;
  selling_price: number;
}

interface RecordSaleModalProps {
  show: boolean;
  products: Product[];
  selectedProductId: string;
  saleQty: number;
  isRecordingSale: boolean;
  onChangeProduct: (id: string) => void;
  onChangeQty: (qty: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function RecordSaleModal({
  show,
  products,
  selectedProductId,
  saleQty,
  isRecordingSale,
  onChangeProduct,
  onChangeQty,
  onSubmit,
  onCancel,
}: RecordSaleModalProps) {
  if (!show) return null;
  return (
    <form
      onSubmit={onSubmit}
      className="fixed z-40 left-0 top-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur"
      style={{ alignItems: "flex-start", paddingTop: "12vh" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 border">
        <div className="mb-4 font-bold text-accent text-lg">Record a Sale</div>
        <div className="mb-3">
          <label className="block mb-1 font-medium text-sm">Product</label>
          <select
            className="w-full px-2 py-2 border rounded"
            value={selectedProductId}
            onChange={e => onChangeProduct(e.target.value)}
            required
          >
            <option value="" disabled>Select product</option>
            {products.map((p) =>
              <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>
            )}
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium text-sm">Quantity</label>
          <input
            className="w-full px-2 py-2 border rounded"
            type="number"
            min={1}
            max={selectedProductId ? (products.find((p) => p.id === selectedProductId)?.stock || 1) : 1}
            value={saleQty}
            onChange={e => onChangeQty(Number(e.target.value))}
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-primary text-white rounded py-2 font-semibold hover:bg-primary/90 transition"
            disabled={isRecordingSale}
          >
            {isRecordingSale ? "Saving..." : "Record Sale"}
          </button>
          <button type="button" className="flex-1 bg-gray-200 rounded py-2 font-semibold" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </form>
  );
}

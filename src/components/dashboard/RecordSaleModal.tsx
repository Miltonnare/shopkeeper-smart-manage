import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const maxQty = selectedProduct ? selectedProduct.stock : 1;

  return (
    <Dialog open={show} onOpenChange={(open) => { if (!open) onCancel(); }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-accent text-lg">Record a Sale</DialogTitle>
          <DialogDescription>
            Select a product and quantity to record a new sale in the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="product-select" className="block text-sm font-medium text-slate-700">
              Product
            </label>
            <select
              id="product-select"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white text-dark-main"
              value={selectedProductId}
              onChange={(e) => onChangeProduct(e.target.value)}
              required
            >
              <option value="" disabled>Select product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id} className="text-dark-main">
                  {p.name} (Stock: {p.stock})
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="quantity-input" className="block text-sm font-medium text-slate-700">
              Quantity
            </label>
            <input
              id="quantity-input"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white text-dark-main"
              type="number"
              min={1}
              max={maxQty}
              value={saleQty}
              onChange={(e) => onChangeQty(Number(e.target.value))}
              required
            />
          </div>
          <DialogFooter className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isRecordingSale || !selectedProductId || saleQty <= 0}
              className="flex-1"
            >
              {isRecordingSale ? "Saving..." : "Record Sale"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

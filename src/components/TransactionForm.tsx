import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface TransactionFormProps {
  products: Product[];
  onSubmit: (transaction: { productId: string; quantity: number }) => void;
}

export function TransactionForm({ products, onSubmit }: TransactionFormProps) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      productId,
      quantity: Number(quantity),
    });
    setProductId('');
    setQuantity('1');
  };

  const selectedProduct = products.find(p => p.id === productId);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Record Sale</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (₹{product.price.toFixed(2)} - {product.stock} in stock)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            max={selectedProduct?.stock}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            min="1"
            required
          />
        </div>

        {selectedProduct && (
          <div className="text-sm text-gray-600">
            Total: ₹{(selectedProduct.price * Number(quantity || 0)).toFixed(2)}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Record Sale
        </button>
      </div>
    </form>
  );
}
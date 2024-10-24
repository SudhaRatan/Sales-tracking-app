import React from 'react';
import { ProductForm } from '../components/ProductForm';
import { Product } from '../types';

interface ProductsPageProps {
  onAddProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  products: Product[];
}

export function ProductsPage({ onAddProduct, products }: ProductsPageProps) {
  return (
    <div className="space-y-6">
      <ProductForm onSubmit={onAddProduct} />
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Product Inventory</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {products.map((product) => (
            <div key={product.id} className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    Stock: {product.stock} | Price: ₹{product.price.toFixed(2)}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800'
                    : product.stock > 0
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 10 
                    ? 'In Stock' 
                    : product.stock > 0
                    ? 'Low Stock'
                    : 'Out of Stock'}
                </span>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="px-6 py-4 text-center text-gray-500">
              No products added yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
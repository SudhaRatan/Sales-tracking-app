import React from 'react';
import { TransactionForm } from '../components/TransactionForm';
import { Product } from '../types';

interface SalesPageProps {
  products: Product[];
  onAddTransaction: (transaction: { productId: string; quantity: number }) => void;
}

export function SalesPage({ products, onAddTransaction }: SalesPageProps) {
  return (
    <div>
      <TransactionForm products={products} onSubmit={onAddTransaction} />
    </div>
  );
}
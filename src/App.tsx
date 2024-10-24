import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Product, Transaction, DashboardStats } from './types';
import { Navbar } from './components/Navigation/Navbar';
import { TabBar } from './components/Navigation/TabBar';
import { ProductsPage } from './pages/ProductsPage';
import { SalesPage } from './pages/SalesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

function App() {
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);

  const handleAddProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
  };

  const handleAddTransaction = (transactionData: { productId: string; quantity: number }) => {
    const product = products.find(p => p.id === transactionData.productId);
    if (!product || product.stock < transactionData.quantity) return;

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      productId: transactionData.productId,
      quantity: transactionData.quantity,
      totalAmount: product.price * transactionData.quantity,
      date: new Date().toISOString(),
    };

    setTransactions([...transactions, newTransaction]);
    setProducts(products.map(p => 
      p.id === product.id 
        ? { ...p, stock: p.stock - transactionData.quantity }
        : p
    ));
  };

  const calculateStats = (): DashboardStats => {
    const totalSales = transactions.length;
    const totalRevenue = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    
    const productSales = transactions.reduce((acc, t) => {
      acc[t.productId] = (acc[t.productId] || 0) + t.quantity;
      return acc;
    }, {} as Record<string, number>);

    const topProducts = Object.entries(productSales)
      .map(([productId, totalSold]) => ({ productId, totalSold }))
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);

    const recentTransactions = [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    return {
      totalSales,
      totalRevenue,
      topProducts,
      recentTransactions,
    };
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8 mb-16 md:mb-0 mt-10">
          <Routes>
            <Route 
              path="/" 
              element={
                <ProductsPage 
                  products={products}
                  onAddProduct={handleAddProduct}
                />
              } 
            />
            <Route 
              path="/sales" 
              element={
                <SalesPage
                  products={products}
                  onAddTransaction={handleAddTransaction}
                />
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <AnalyticsPage
                  stats={calculateStats()}
                  products={products}
                />
              } 
            />
          </Routes>
        </main>
        <TabBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { Dashboard } from '../components/Dashboard';
import { Product, DashboardStats } from '../types';

interface AnalyticsPageProps {
  stats: DashboardStats;
  products: Product[];
}

export function AnalyticsPage({ stats, products }: AnalyticsPageProps) {
  return (
    <div>
      <Dashboard stats={stats} products={products} />
    </div>
  );
}
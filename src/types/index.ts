export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  productId: string;
  quantity: number;
  totalAmount: number;
  date: string;
}

export interface DashboardStats {
  totalSales: number;
  totalRevenue: number;
  topProducts: Array<{productId: string; totalSold: number}>;
  recentTransactions: Transaction[];
}
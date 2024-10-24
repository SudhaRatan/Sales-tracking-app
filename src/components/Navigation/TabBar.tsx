import React from 'react';
import { Package, ShoppingCart, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function TabBar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="grid grid-cols-3 h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center ${
            isActive('/') ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <Package className="h-6 w-6" />
          <span className="text-xs mt-1">Products</span>
        </Link>
        
        <Link
          to="/sales"
          className={`flex flex-col items-center justify-center ${
            isActive('/sales') ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="text-xs mt-1">Sales</span>
        </Link>
        
        <Link
          to="/analytics"
          className={`flex flex-col items-center justify-center ${
            isActive('/analytics') ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <BarChart3 className="h-6 w-6" />
          <span className="text-xs mt-1">Analytics</span>
        </Link>
      </div>
    </div>
  );
}
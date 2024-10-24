import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        // Scrolling down and past threshold
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className={`hidden md:block bg-white shadow-sm fixed top-0 left-0 right-0 z-10 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">Sales Tracker</span>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive('/') 
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Package className="h-5 w-5" />
              <span>Products</span>
            </Link>
            
            <Link
              to="/sales"
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive('/sales')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Record Sale</span>
            </Link>
            
            <Link
              to="/analytics"
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive('/analytics')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
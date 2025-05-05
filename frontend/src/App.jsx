// App.jsx

import React, { useState } from 'react';
import { Package, BarChart2, ShoppingCart, Settings, Home } from 'lucide-react';
import StockList from './components/StockList';
import SaleAnalytics from './components/sale_analytics';
import SalesOverview from './components/SalesOverview';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'analytics':
        return <SaleAnalytics />;
      case 'sales':
        return <SalesOverview />;
      default:
        return <StockList />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Car Parts Shop</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-3 py-2 rounded-lg flex items-center space-x-2 ${
                  currentPage === 'home'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Inventory</span>
              </button>


              <button
                onClick={() => setCurrentPage('sales')}
                className={`px-3 py-2 rounded-lg flex items-center space-x-2 ${
                  currentPage === 'sales'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Sales</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {currentPage === 'home' && 'Inventory Management'}
            {currentPage === 'analytics' && 'Analytics Dashboard'}
            {currentPage === 'sales' && 'Sales Overview'}
          </h1>
          <p className="text-gray-600 mt-1">
          
            {currentPage === 'home' && 'Manage your inventory and stock levels\n'}
            
            {currentPage === 'analytics' && 'View detailed analytics and insights'}
            {currentPage === 'sales' && 'Track and manage sales performance'}
          </p>
        </div>

        {/* Page Content */}
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Car Parts Shop. All rights reserved. Developed by Aadarsh Bhagat
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Download,
  Search,
  RefreshCcw,
  Package2,
  AlertCircle,
  DollarSign,
  Store,
  TrendingDown,
  Filter,
  ClipboardList,
  ArrowUpDown,
  Boxes
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import NavSysItem from './NavSysItem';
import AddStock from './AddStock';
import Analytics from './Analytics';

const API_URL = 'http://127.0.0.1:5000/api';

export default function StockList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    sort_by: 'stock_code',
    sort_order: 'asc'
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    per_page: 6
  });

  useEffect(() => {
    loadItems();
  }, [filters, pagination.current_page]);

  const loadItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/items`, {
        params: {
          ...filters,
          page: pagination.current_page,
          per_page: pagination.per_page
        }
      });

      setItems(response.data.items);
      setPagination(response.data.pagination);
      setStats(response.data.statistics);

      const uniqueBrands = [...new Set(response.data.items
        .map(item => item.brand)
        .filter(brand => brand && brand.trim()))]
        .sort();
      setAvailableBrands(uniqueBrands);
    } catch (error) {
      console.error('Error loading items:', error);
      toast.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrice = async (stockCode, newPrice) => {
    try {
      const response = await axios.put(`${API_URL}/items/${stockCode}`, {
        price: parseFloat(newPrice)
      });
      if (response.data) {
        toast.success('Price updated successfully');
        loadItems();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update price');
    }
  };

  const handleUpdateBrand = async (stockCode, newBrand) => {
    try {
      const response = await axios.put(`${API_URL}/items/${stockCode}`, {
        brand: newBrand
      });
      if (response.data) {
        toast.success('Brand updated successfully');
        loadItems();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update brand');
    }
  };

  const handleSell = async (stockCode, quantity) => {
    try {
      const response = await axios.post(`${API_URL}/items/${stockCode}/sell`, {
        quantity: parseInt(quantity)
      });
      if (response.data) {
        toast.success(`Sold ${quantity} items successfully`);
        loadItems();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to sell items');
    }
  };

  const handleUpdateStock = async (stockCode, quantity) => {
    try {
      const response = await axios.put(`${API_URL}/items/${stockCode}`, {
        quantity: parseInt(quantity)
      });
      if (response.data) {
        toast.success(`Stock updated successfully`);
        loadItems();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update stock');
    }
  };

  const handleDelete = async (stockCode) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/items/${stockCode}`);
      toast.success('Item deleted successfully');
      loadItems();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete item');
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(`${API_URL}/items/export`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `stock_items_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Export successful');
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const handleSort = (sortBy) => {
    setFilters(prev => ({
      ...prev,
      sort_by: sortBy,
      sort_order: prev.sort_by === sortBy && prev.sort_order === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg shadow-blue-100/50 p-6 border border-blue-50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Total Items
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">{stats.total_items}</h3>
              <p className="text-sm text-gray-500">Items in inventory</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg shadow-green-100/50 p-6 border border-green-50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Total Value
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">${stats.total_value.toFixed(2)}</h3>
              <p className="text-sm text-gray-500">Current stock value</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg shadow-purple-100/50 p-6 border border-purple-50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Value with VAT
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">${stats.total_value_vat.toFixed(2)}</h3>
              <p className="text-sm text-gray-500">Including VAT</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg shadow-red-100/50 p-6 border border-red-50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                Low Stock
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-red-600">{stats.low_stock_items}</h3>
              <p className="text-sm text-gray-500">Items need restock</p>
            </div>
          </div>
        </div>
      )}

      {/* Controls Section */}
      <div className="bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          <div className="flex-1 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search items by code, brand, or description..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            <div className="md:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.brand}
                  onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                >
                  <option value="">All Brands ({stats?.total_items || 0})</option>
                  {availableBrands.map(brand => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={loadItems}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Add Stock Form */}
        <AddStock onSuccess={loadItems} />
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-lg p-6">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading inventory...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-lg p-6">
          <Boxes className="w-16 h-16 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No items found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <NavSysItem
              key={item.stock_code}
              item={item}
              onUpdatePrice={(newPrice) => handleUpdatePrice(item.stock_code, newPrice)}
              onUpdateBrand={(newBrand) => handleUpdateBrand(item.stock_code, newBrand)}
              onSell={(quantity) => handleSell(item.stock_code, quantity)}
              onDelete={() => handleDelete(item.stock_code)}
              onUpdateStock={(quantity) => handleUpdateStock(item.stock_code, quantity)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow">
            {Array.from({ length: pagination.total_pages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPagination({ ...pagination, current_page: i + 1 })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  pagination.current_page === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Analytics Section */}
      <Analytics items={items} />
    </div>
  );
}

// components/Analytics.jsx

import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Package2, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

export default function Analytics({ items }) {
  // Calculate data for charts
  const brandDistribution = items.reduce((acc, item) => {
    acc[item.brand] = (acc[item.brand] || 0) + 1;
    return acc;
  }, {});

  const brandData = Object.entries(brandDistribution).map(([brand, count]) => ({
    name: brand,
    value: count
  }));

  const stockLevels = items.map(item => ({
    name: item.stock_code,
    stock: item.quantity,
    value: item.price * item.quantity
  }));

  const lowStockItems = items.filter(item => item.quantity < 10);
  const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const averagePrice = items.reduce((sum, item) => sum + item.price, 0) / items.length;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl shadow-lg">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Price</p>
              <p className="text-2xl font-bold">${averagePrice.toFixed(2)}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600 h-6 w-6" />
            </div>
          </div>
        </div>
        {/* Add more stat boxes as needed */}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Brand Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={brandData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {brandData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Levels */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Stock Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockLevels}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Value Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Value Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockLevels}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Low Stock Warning */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Low Stock Items</h3>
          <div className="space-y-4">
            {lowStockItems.map(item => (
              <div key={item.stock_code} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.stock_code}</p>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                </div>
                <div className="flex items-center text-red-600">
                  <Package2 className="h-4 w-4 mr-2" />
                  <span className="font-medium">{item.quantity} left</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

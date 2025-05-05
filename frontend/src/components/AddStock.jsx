// AddStock.jsx
import React, { useState } from 'react';
import {
  Plus,
  X,
  Loader2,
  Package2,
  Tag,
  DollarSign,
  Box,
  Info,
  CircleAlert,
  CheckCircle2,
  Type
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

export default function AddStock({ onSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [item, setItem] = useState({
    stock_code: '',
    quantity: '',
    price: '',
    brand: '',
    stock_type: 'Navigation system',
    description: 'GeoVision Sat Nav'
  });

  const validateForm = () => {
    const errors = {};
    // With this simpler validation
if (!item.stock_code) {
  errors.stock_code = 'Stock code is required';
}

    if (!item.quantity) {
      errors.quantity = 'Quantity is required';
    } else if (parseInt(item.quantity) <= 0) {
      errors.quantity = 'Quantity must be greater than 0';
    }

    if (!item.price) {
      errors.price = 'Price is required';
    } else if (parseFloat(item.price) <= 0) {
      errors.price = 'Price must be greater than 0';
    }

    if (!item.brand.trim()) {
      errors.brand = 'Brand is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/items`, {
        ...item,
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price)
      });

      toast.success(response.data.message || 'Item added successfully');
      setIsOpen(false);
      resetForm();
      if (onSuccess) onSuccess();

    } catch (error) {
      console.error('Error adding item:', error);
      toast.error(error.response?.data?.error || 'Failed to add item');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setItem({
      stock_code: '',
      quantity: '',
      price: '',
      brand: '',
      stock_type: 'Navigation system',
      description: 'GeoVision Sat Nav'
    });
    setFormErrors({});
  };

  return (
    <div className="relative">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-6 bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500
                   hover:bg-blue-50/50 transition-all duration-200"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Add New Item</h3>
              <p className="text-sm text-gray-500">Click to add new stock to inventory</p>
            </div>
          </div>
        </button>
      ) : (
        <div className="bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Package2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Add New Item</h3>
                  <p className="text-sm text-gray-500">Fill in the item details below</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Stock Code & Brand Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Tag className="w-4 h-4" />
                  Stock Code *
                </label>
                <input
                  type="text"
                  placeholder="e.g., VK101"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.stock_code ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  value={item.stock_code}
                  onChange={(e) => {
                    setItem({...item, stock_code: e.target.value.toUpperCase()});
                    if (formErrors.stock_code) {
                      setFormErrors({...formErrors, stock_code: null});
                    }
                  }}
                  disabled={isLoading}
                />
                {formErrors.stock_code ? (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <CircleAlert className="w-4 h-4" />
                    {formErrors.stock_code}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                     letters followed by numbers (OPTIONAL)
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Type className="w-4 h-4" />
                  Brand *
                </label>
                <input
                  type="text"
                  placeholder="e.g., CTEK"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.brand ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  value={item.brand}
                  onChange={(e) => {
                    setItem({...item, brand: e.target.value});
                    if (formErrors.brand) {
                      setFormErrors({...formErrors, brand: null});
                    }
                  }}
                  disabled={isLoading}
                />
                {formErrors.brand && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <CircleAlert className="w-4 h-4" />
                    {formErrors.brand}
                  </p>
                )}
              </div>
            </div>

            {/* Quantity & Price Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Box className="w-4 h-4" />
                  Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.quantity ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  value={item.quantity}
                  onChange={(e) => {
                    setItem({...item, quantity: e.target.value});
                    if (formErrors.quantity) {
                      setFormErrors({...formErrors, quantity: null});
                    }
                  }}
                  disabled={isLoading}
                />
                {formErrors.quantity && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <CircleAlert className="w-4 h-4" />
                    {formErrors.quantity}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="w-4 h-4" />
                  Price * (without VAT)
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter price"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  value={item.price}
                  onChange={(e) => {
                    setItem({...item, price: e.target.value});
                    if (formErrors.price) {
                      setFormErrors({...formErrors, price: null});
                    }
                  }}
                  disabled={isLoading}
                />
                {formErrors.price && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <CircleAlert className="w-4 h-4" />
                    {formErrors.price}
                  </p>
                )}
              </div>
            </div>

            {/* Fixed Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Info className="w-4 h-4" />
                  Stock Type
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                  value={item.stock_type}
                  disabled
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Info className="w-4 h-4" />
                  Description
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                  value={item.description}
                  disabled
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  resetForm();
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900
                         hover:bg-gray-100 rounded-lg transition-colors duration-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                         focus:ring-blue-500 transition-colors duration-200 disabled:bg-blue-300
                         flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Item
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

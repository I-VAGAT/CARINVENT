import React, { useState } from 'react';
import {
  Pencil,
  Save,
  X,
  AlertCircle,
  Package2,
  DollarSign,
  Tag,
  ShoppingCart,
  Trash2,
  Type,
  Box,
  Plus,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function NavSysItem({ item, onUpdatePrice, onSell, onDelete, onUpdateStock, onUpdateBrand }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(item.price);
  const [editedBrand, setEditedBrand] = useState(item.brand);
  const [sellQuantity, setSellQuantity] = useState(1);
  const [addQuantity, setAddQuantity] = useState(1);
  const [showSellForm, setShowSellForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSave = () => {
    // Validate price
    if (editedPrice <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    // Validate brand
    if (!editedBrand.trim()) {
      toast.error('Brand cannot be empty');
      return;
    }

    if (editedPrice !== item.price) {
      onUpdatePrice(editedPrice);
    }
    if (editedBrand !== item.brand) {
      onUpdateBrand(editedBrand);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPrice(item.price);
    setEditedBrand(item.brand);
    setIsEditing(false);
  };

  const handleSellSubmit = () => {
    if (sellQuantity <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }

    if (sellQuantity > item.quantity) {
      toast.error(`Cannot sell ${sellQuantity} items. Only ${item.quantity} items available in stock`);
      return;
    }

    onSell(sellQuantity);
    setShowSellForm(false);
    setSellQuantity(1);
  };

  const handleAddSubmit = () => {
    if (addQuantity <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }

    const totalQuantity = item.quantity + addQuantity;
    if (totalQuantity > 100) {
      toast.error(`Cannot add ${addQuantity} items. Total quantity (${totalQuantity}) would exceed 100 items limit`);
      return;
    }

    onUpdateStock(addQuantity);
    setShowAddForm(false);
    setAddQuantity(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Package2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{item.stock_name}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            title="Edit item"
          >
            <Pencil className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
              title="Save changes"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              title="Cancel changes"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-4">
        {/* Stock Code */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Stock Code:</span>
          </div>
          <span className="font-medium">{item.stock_code}</span>
        </div>

        {/* Brand */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Brand:</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedBrand}
              onChange={(e) => setEditedBrand(e.target.value)}
              className="w-32 px-2 py-1 text-right border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter brand"
            />
          ) : (
            <span className="font-medium">{item.brand}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Price (excl. VAT):</span>
          </div>
          {isEditing ? (
            <input
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(parseFloat(e.target.value) || 0)}
              min="0.01"
              step="0.01"
              className="w-32 px-2 py-1 text-right border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="font-medium">${item.price.toFixed(2)}</span>
          )}
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Quantity in Stock:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-medium ${item.quantity < 10 ? 'text-red-600' : ''}`}>
              {item.quantity}
            </span>
            {item.quantity < 10 && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Low Stock
              </span>
            )}
            {item.quantity === 100 && (
              <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Max Stock
              </span>
            )}
          </div>
        </div>

        {/* Price with VAT */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Price (incl. VAT):</span>
          </div>
          <span className="font-medium">${item.price_with_vat.toFixed(2)}</span>
        </div>

        {/* Stock Management Forms */}
        {showAddForm && (
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={100 - item.quantity}
              value={addQuantity}
              onChange={(e) => setAddQuantity(parseInt(e.target.value) || 0)}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Quantity to add"
            />
            <button
              onClick={handleAddSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              disabled={item.quantity >= 100}
            >
              Add
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {showSellForm && (
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={item.quantity}
              value={sellQuantity}
              onChange={(e) => setSellQuantity(parseInt(e.target.value) || 0)}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Quantity to sell"
            />
            <button
              onClick={handleSellSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300"
              disabled={item.quantity === 0}
            >
              Sell
            </button>
            <button
              onClick={() => setShowSellForm(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              disabled={item.quantity >= 100}
            >
              <Plus className="w-4 h-4" />
              Add Stock
              {item.quantity >= 100 && " (Max)"}
            </button>
          )}

          {!showSellForm && (
            <button
              onClick={() => setShowSellForm(true)}
              disabled={item.quantity === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300"
            >
              <ShoppingCart className="w-4 h-4" />
              Sell
              {item.quantity === 0 && " (Empty)"}
            </button>
          )}

          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stock Warnings */}
      {item.quantity < 10 && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">Low stock alert - Consider restocking</span>
        </div>
      )}
      {item.quantity >= 100 && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-600 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">Maximum stock level reached</span>
        </div>
      )}
    </div>
  );
}

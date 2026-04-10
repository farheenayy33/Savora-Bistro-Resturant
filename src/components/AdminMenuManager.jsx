import React, { useState } from 'react';
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItems,
} from '../utils/localStorageHelpers';
import { useApp } from '../context/AppContext';
import AnimatedButton from './AnimatedButton';

const AdminMenuManager = () => {
  const { menuItems, updateMenuItems, showToastMessage } = useApp();
  const [isEditing, setIsEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Starters',
    image: '',
  });

  const categories = ['Starters', 'Main Course', 'Desserts', 'Drinks'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateMenuItem(isEditing, formData);
      showToastMessage('Menu item updated successfully!');
      setIsEditing(null);
    } else {
      addMenuItem(formData);
      showToastMessage('Menu item added successfully!');
    }

    updateMenuItems();
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Starters',
      image: '',
    });
  };

  const handleEdit = (item) => {
    setIsEditing(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      deleteMenuItem(id);
      updateMenuItems();
      showToastMessage('Menu item deleted successfully!');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(null);
    resetForm();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
        <AnimatedButton
          onClick={() => {
            setShowForm(true);
            setIsEditing(null);
            resetForm();
          }}
          variant="primary"
        >
          + Add Menu Item
        </AnimatedButton>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-orange-200">
          <h3 className="text-xl font-bold mb-4">
            {isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input-field"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <AnimatedButton type="submit" variant="primary">
              {isEditing ? 'Update' : 'Add'} Item
            </AnimatedButton>
            <AnimatedButton type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </AnimatedButton>
          </div>
        </form>
      )}

      {/* Menu Items List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">Image</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">Category</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">Price</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {menuItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  No menu items yet. Add your first item!
                </td>
              </tr>
            ) : (
              menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop';
                      }}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600 line-clamp-1">{item.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 font-semibold text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMenuManager;

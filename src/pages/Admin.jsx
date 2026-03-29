import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AdminMenuManager from '../components/AdminMenuManager';
import AdminReservations from '../components/AdminReservations';
import AnimatedButton from '../components/AnimatedButton';
import { getReservations, getContactSubmissions } from '../utils/localStorageHelpers';
const Admin = () => {
  const { adminLoggedIn, loginAdmin, logoutAdmin, menuItems } = useApp();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!adminLoggedIn) {
      // Don't redirect, just show login form
    }
  }, [adminLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (loginAdmin(password)) {
      setPassword('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  if (!adminLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter admin password"
                required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <p className="text-gray-500 text-sm mt-2">
                Default password: <code className="bg-gray-100 px-2 py-1 rounded">admin123</code>
              </p>
            </div>
            <AnimatedButton type="submit" variant="primary" className="w-full">
              Login
            </AnimatedButton>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage your restaurant operations</p>
          </div>
          <AnimatedButton onClick={logoutAdmin} variant="danger">
            Logout
          </AnimatedButton>
        </div>

        {/* Stats Cards */}
        <AdminStats />

        {/* Admin Sections */}
        <div className="space-y-8">
          <AdminMenuManager />
          <AdminReservations />
        </div>
      </div>
    </div>
  );
};
export default Admin;

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  getMenuItems,
  getCart,
  saveCart,
  isAdminLoggedIn,
  setAdminLogin,
  initializeDefaultMenu,
} from '../utils/localStorageHelpers';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [adminLoggedIn, setAdminLoggedInState] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showCart, setShowCart] = useState(false);

  // Initialize default menu on mount
  useEffect(() => {
    initializeDefaultMenu();
    setMenuItems(getMenuItems());
    setCart(getCart());
    setAdminLoggedInState(isAdminLoggedIn());
  }, []);

  // Update menu items
  const updateMenuItems = useCallback(() => {
    setMenuItems(getMenuItems());
  }, []);

  // Cart functions
  const addToCart = useCallback((item) => {
    const updatedCart = getCart();
    const existingItem = updatedCart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    saveCart(updatedCart);
    setCart(updatedCart);
    showToastMessage(`${item.name} added to cart!`);
  }, []);

  const removeFromCart = useCallback((id) => {
    const updatedCart = getCart().filter(item => item.id !== id);
    saveCart(updatedCart);
    setCart(updatedCart);
  }, []);

  const updateCartQuantity = useCallback((id, quantity) => {
    const updatedCart = getCart();
    const item = updatedCart.find(item => item.id === id);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(id);
        return;
      }
      item.quantity = quantity;
      saveCart(updatedCart);
      setCart(updatedCart);
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    localStorage.removeItem('cart');
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  // Admin functions
  const loginAdmin = useCallback((password) => {
    // Simple password check (in production, use proper authentication)
    if (password === 'admin123') {
      setAdminLogin(true);
      setAdminLoggedInState(true);
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdminLogin(false);
    setAdminLoggedInState(false);
  }, []);

  // Toast notification
  const showToastMessage = useCallback((message) => {
    setToastMessage(message);
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    menuItems,
    updateMenuItems,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    adminLoggedIn,
    loginAdmin,
    logoutAdmin,
    showToast,
    toastMessage,
    showToastMessage,
    showCart,
    setShowCart,
  }), [
    menuItems,
    updateMenuItems,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    adminLoggedIn,
    loginAdmin,
    logoutAdmin,
    showToast,
    toastMessage,
    showToastMessage,
    showCart,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

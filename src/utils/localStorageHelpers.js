/**
 * localStorage Helper Functions
 * Provides safe CRUD operations for menu items and reservations
 */

const STORAGE_KEYS = {
  MENU_ITEMS: 'menuItems',
  RESERVATIONS: 'reservations',
};
/**
 * Safely parse JSON from localStorage
 * @param {string} key - Storage key
 * @returns {any} Parsed data or default value
 */
const safeGet = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return null;
  }
};
/**
 * Safely save data to localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to save
 * @returns {boolean} Success status
 */
const safeSave = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
};

// ============================================================================
// MENU ITEMS
// ============================================================================

export const getMenuItems = () => {
  const items = safeGet(STORAGE_KEYS.MENU_ITEMS);
  return Array.isArray(items) ? items : [];
};

export const saveMenuItems = (items) => {
  if (!Array.isArray(items)) {
    console.warn('saveMenuItems expects an array');
    return false;
  }
  return safeSave(STORAGE_KEYS.MENU_ITEMS, items);
};

export const addMenuItem = (item) => {
  if (!item || typeof item !== 'object') {
    console.error('Invalid menu item provided');
    return null;
  }

  try {
    const items = getMenuItems();
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    items.push(newItem);
    saveMenuItems(items);
    return newItem;
  } catch (error) {
    console.error('Error adding menu item:', error);
    return null;
  }
};

export const updateMenuItem = (id, updatedItem) => {
  if (!id || !updatedItem) {
    console.error('Invalid ID or updated item provided');
    return null;
  }

  try {
    const items = getMenuItems();
    const index = items.findIndex(item => item.id === id);

    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem };
      saveMenuItems(items);
      return items[index];
    }

    console.warn(`Menu item with ID "${id}" not found`);
    return null;
  } catch (error) {
    console.error('Error updating menu item:', error);
    return null;
  }
};

export const deleteMenuItem = (id) => {
  if (!id) {
    console.error('Invalid ID provided');
    return false;
  }

  try {
    const items = getMenuItems();
    const filtered = items.filter(item => item.id !== id);

    if (filtered.length === items.length) {
      console.warn(`Menu item with ID "${id}" not found`);
      return false;
    }

    return saveMenuItems(filtered);
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return false;
  }
};

// ============================================================================
// RESERVATIONS
// ============================================================================

export const getReservations = () => {
  const reservations = safeGet(STORAGE_KEYS.RESERVATIONS);
  return Array.isArray(reservations) ? reservations : [];
};

export const saveReservations = (reservations) => {
  if (!Array.isArray(reservations)) {
    console.warn('saveReservations expects an array');
    return false;
  }
  return safeSave(STORAGE_KEYS.RESERVATIONS, reservations);
};

export const addReservation = (reservation) => {
  if (!reservation || typeof reservation !== 'object') {
    console.error('Invalid reservation provided');
    return null;
  }

  try {
    const reservations = getReservations();
    const newReservation = {
      ...reservation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    reservations.push(newReservation);
    saveReservations(reservations);
    return newReservation;
  } catch (error) {
    console.error('Error adding reservation:', error);
    return null;
  }
};

export const updateReservation = (id, updatedReservation) => {
  if (!id || !updatedReservation) {
    console.error('Invalid ID or updated reservation provided');
    return null;
  }

  try {
    const reservations = getReservations();
    const index = reservations.findIndex(res => res.id === id);

    if (index !== -1) {
      reservations[index] = { ...reservations[index], ...updatedReservation };
      saveReservations(reservations);
      return reservations[index];
    }

    console.warn(`Reservation with ID "${id}" not found`);
    return null;
  } catch (error) {
    console.error('Error updating reservation:', error);
    return null;
  }
};

export const deleteReservation = (id) => {
  if (!id) {
    console.error('Invalid ID provided');
    return false;
  }

  try {
    const reservations = getReservations();
    const filtered = reservations.filter(res => res.id !== id);

    if (filtered.length === reservations.length) {
      console.warn(`Reservation with ID "${id}" not found`);
      return false;
    }

    return saveReservations(filtered);
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return false;
  }
};

// Contact Submissions
export const getContactSubmissions = () => {
  const submissions = localStorage.getItem('contactSubmissions');
  return submissions ? JSON.parse(submissions) : [];
};

export const saveContactSubmissions = (submissions) => {
  localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
};

export const addContactSubmission = (submission) => {
  const submissions = getContactSubmissions();
  const newSubmission = {
    ...submission,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  submissions.push(newSubmission);
  saveContactSubmissions(submissions);
  return newSubmission;
};

export const deleteContactSubmission = (id) => {
  const submissions = getContactSubmissions();
  const filtered = submissions.filter(sub => sub.id !== id);
  saveContactSubmissions(filtered);
};

// Admin Authentication
export const isAdminLoggedIn = () => {
  return localStorage.getItem('adminLoggedIn') === 'true';
};

export const setAdminLogin = (status) => {
  localStorage.setItem('adminLoggedIn', status ? 'true' : 'false');
};

// Cart
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (item) => {
  const cart = getCart();
  const existingItem = cart.find(cartItem => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
  return cart;
};

export const removeFromCart = (id) => {
  const cart = getCart();
  const filtered = cart.filter(item => item.id !== id);
  saveCart(filtered);
  return filtered;
};

export const updateCartQuantity = (id, quantity) => {
  const cart = getCart();
  const item = cart.find(item => item.id === id);
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(id);
    }
    item.quantity = quantity;
    saveCart(cart);
  }
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem('cart');
};

// Initialize default menu items if none exist
export const initializeDefaultMenu = () => {
  const items = getMenuItems();
  if (items.length === 0) {
    const defaultMenu = [
      {
        id: '1',
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan cheese',
        price: 12.99,
        category: 'Starters',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
      },
      {
        id: '2',
        name: 'Grilled Salmon',
        description: 'Atlantic salmon with lemon butter sauce, served with seasonal vegetables',
        price: 24.99,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      },
      {
        id: '3',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
        price: 9.99,
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
      },
      {
        id: '4',
        name: 'Mango Smoothie',
        description: 'Fresh mango blended with yogurt and honey',
        price: 6.99,
        category: 'Drinks',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
      },
      {
        id: '5',
        name: 'Bruschetta',
        description: 'Toasted bread topped with fresh tomatoes, basil, and mozzarella',
        price: 10.99,
        category: 'Starters',
        image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop',
      },
      {
        id: '6',
        name: 'Ribeye Steak',
        description: 'Prime ribeye steak cooked to perfection, served with mashed potatoes',
        price: 32.99,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      },
    ];
    saveMenuItems(defaultMenu);
  }
};

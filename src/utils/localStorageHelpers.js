// Helper functions for localStorage operations

// Menu Items
export const getMenuItems = () => {
  const items = localStorage.getItem('menuItems');
  return items ? JSON.parse(items) : [];
};

export const saveMenuItems = (items) => {
  localStorage.setItem('menuItems', JSON.stringify(items));
};

export const addMenuItem = (item) => {
  const items = getMenuItems();
  const newItem = {
    ...item,
    id: Date.now().toString(),
  };
  items.push(newItem);
  saveMenuItems(items);
  return newItem;
};

export const updateMenuItem = (id, updatedItem) => {
  const items = getMenuItems();
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    saveMenuItems(items);
    return items[index];
  }
  return null;
};

export const deleteMenuItem = (id) => {
  const items = getMenuItems();
  const filtered = items.filter(item => item.id !== id);
  saveMenuItems(filtered);
};

// Reservations
export const getReservations = () => {
  const reservations = localStorage.getItem('reservations');
  return reservations ? JSON.parse(reservations) : [];
};

export const saveReservations = (reservations) => {
  localStorage.setItem('reservations', JSON.stringify(reservations));
};

export const addReservation = (reservation) => {
  const reservations = getReservations();
  const newReservation = {
    ...reservation,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  reservations.push(newReservation);
  saveReservations(reservations);
  return newReservation;
};

export const deleteReservation = (id) => {
  const reservations = getReservations();
  const filtered = reservations.filter(res => res.id !== id);
  saveReservations(filtered);
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

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedSection from '../components/AnimatedSection';

const CartPage = () => {
    const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart, showToastMessage } = useApp();
    const navigate = useNavigate();
    const cartTotal = getCartTotal();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = () => {
        setIsProcessing(true);
        // Simulate processing
        setTimeout(() => {
            showToastMessage('🎉 Congratulations! Your order has been placed successfully!');
            clearCart();
            setIsProcessing(false);
            navigate('/menu');
        }, 1500);
    };

    if (cart.length === 0) {
        return (
            <AnimatedSection animation="fadeSlideUp">
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="text-center max-w-md">
                        <div className="mb-8">
                            <div className="text-8xl mb-4">🛒</div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Your Cart is Empty
                            </h1>
                            <p className="text-gray-600 text-lg mb-8">
                                Looks like you haven't added any delicious items to your cart yet.
                            </p>
                        </div>
                        <Link to="/menu">
                            <AnimatedButton variant="primary" className="text-lg px-8 py-4">
                                Browse Our Menu
                            </AnimatedButton>
                        </Link>
                    </div>
                </div>
            </AnimatedSection>
        );
    }

    return (
        <AnimatedSection animation="fadeSlideUp">
            <div className="min-h-screen py-8 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Your Cart 🛒
                        </h1>
                        <p className="text-gray-600">
                            {cart.reduce((total, item) => total + item.quantity, 0)} items in your cart
                        </p>
                    </div>

                    {/* Cart Items */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                        <div className="p-6">
                            <div className="space-y-4">
                                {cart.map((item, index) => (
                                    <AnimatedSection key={item.id} animation="slideLeft" delay={index * 0.05}>
                                        <div
                                            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop';
                                                }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 text-lg truncate">{item.name}</h3>
                                                <p className="text-orange-600 font-medium">${item.price.toFixed(2)} each</p>
                                                <div className="flex items-center space-x-3 mt-3">
                                                    <button
                                                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-gray-900 mb-3">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>

                        {/* Clear Cart Button */}
                        <div className="px-6 pb-4">
                            <button
                                onClick={clearCart}
                                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <AnimatedSection animation="fadeSlideUp" delay={0.2}>
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (10%)</span>
                                    <span>${(cartTotal * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-3xl font-bold text-orange-600">
                                        ${(cartTotal * 1.1).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <AnimatedButton
                                variant="primary"
                                className="w-full mb-3 text-lg"
                                onClick={handleCheckout}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                            </AnimatedButton>
                            <Link to="/menu">
                                <button className="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors">
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default CartPage;


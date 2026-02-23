import React from 'react';
import { useApp } from '../context/AppContext';

const Toast = () => {
  const { showToast, toastMessage } = useApp();

  if (!showToast) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-up">
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center space-x-3 min-w-[300px]">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-semibold">{toastMessage}</span>
      </div>
    </div>
  );
};

export default Toast;

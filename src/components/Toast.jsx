import React, { memo, useMemo } from 'react';
import { useApp } from '../context/AppContext';

const Toast = memo(() => {
  const { showToast, toastMessage } = useApp();

  const toastContent = useMemo(() => {
    if (!showToast) return null;

    return (
      <div className="fixed top-20 right-4 z-50 animate-slide-up pointer-events-auto">
        <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center space-x-3 min-w-[300px] max-w-[400px]">
          <svg
            className="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-semibold truncate">{toastMessage}</span>
        </div>
      </div>
    );
  }, [showToast, toastMessage]);

  return toastContent;
}, (prevProps, nextProps) => {
  // Toast renders rarely, so simple equality check is fine
  return true;
});

Toast.displayName = 'Toast';

export default Toast;

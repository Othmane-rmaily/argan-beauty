import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="bg-white dark:bg-darkCard rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 relative z-10 transform transition-all">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        Are you sure you want to remove this product from the cart?
        </h3>
        
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
          >
            cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
          >
            yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
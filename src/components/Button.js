import React from 'react';

export default function Button({ handleAction, children, type = 'primary' }) {
  const buttonStyles = {
    primary: 'text-blue-600 hover:bg-blue-600 border-blue-600',
    success: 'text-green-600 hover:bg-green-600 border-green-600',
    danger: 'text-red-600 hover:bg-red-600 border-red-600',
    neutral: 'text-gray-600 hover:bg-gray-600 border-gray-600',
  };

  const style = `bg-transparent ${buttonStyles[type]} font-semibold hover:text-white py-1 px-3 border hover:border-transparent rounded-full mr-2`;
  return (
    <button onClick={handleAction} className={style}>
      {children}
    </button>
  );
}

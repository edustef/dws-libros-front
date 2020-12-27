import React from 'react';

export default function Button({ handleAction, children, color = 'blue' }) {
  const textColor = `text-${color}-600`;
  const bgColor = `bg-${color}-600`;
  const borderColor = `border-${color}-600`;
  return (
    <button
      onClick={handleAction}
      className={`bg-transparent hover:${bgColor} ${textColor} font-semibold hover:text-white py-1 px-3 border ${borderColor} hover:border-transparent rounded-full mr-2`}
    >
      {children}
    </button>
  );
}

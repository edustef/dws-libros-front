import React from 'react';

export default function Tag({ name, color = 'blue' }) {
  const bgColor = `bg-${color}-200`;
  const textColor = `text-${color}-700`;
  return (
    <div
      className={`text-xs inline-flex items-center font-semibold leading-sm uppercase px-3 py-1 rounded-full ${textColor} ${bgColor}`}
    >
      {name}
    </div>
  );
}

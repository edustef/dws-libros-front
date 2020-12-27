import React from 'react';

export default function TableBody({ children }) {
  return (
    <tbody className='bg-white divide-y divide-gray-200'>{children}</tbody>
  );
}

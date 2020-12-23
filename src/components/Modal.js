import React from 'react';

export default function Modal({ children, handleModal }) {
  return (
    <div className='fixed z-10 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div
            onClick={() => handleModal(false)}
            className='absolute inset-0 bg-gray-500 opacity-75'
          ></div>
        </div>
        <div
          className='inline-block bg-white relative rounded-lg align-bottom text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-5xl sm: w-full'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <button
            onClick={() => handleModal(false)}
            className='absolute right-0 font-bold text-gray-400 p-1 m-3'
          >
            X
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

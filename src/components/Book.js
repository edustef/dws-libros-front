import React, { useState } from 'react';
import Tag from './Tag';
import Button from '../components/Button';

export default function Book({ setCurrentLibro, handleDelete, ...libro }) {
  let [isMenu, setIsMenu] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsMenu(true)}
      onMouseLeave={() => setIsMenu(false)}
      className='px-4 py-8 w-80'
    >
      <div className='bg-white shadow-2xl'>
        <div className='relative '>
          {isMenu ? (
            <div className='z-10 absolute w-full h-full'>
              <div className='w-full h-full grid place-items-center'>
                <div>
                  <Button handleAction={() => setCurrentLibro(libro)}>Edit</Button>
                  <Button
                    handleAction={() => handleDelete(libro.isbn)}
                    type='danger'
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
          <div className='bg-white'>
            <img
              className={`w-full h-64 object-cover ${
                isMenu ? 'opacity-20' : ''
              }`}
              alt='book cover'
              src={libro.imagenPortada}
            />
          </div>
        </div>
        <div className='px-4 py-2 mt-2 bg-white'>
          <h2 className='font-bold text-xl text-gray-800'>{libro.titulo}</h2>
          <small className='text-gray-500 italic'>{libro.autor}</small>
          <p className='sm:text-sm text-xs text-gray-700 mr-1 my-3'>
            {libro.subtitulo.substring(0, 50)}
          </p>
          <div className='user flex justify-between items-center mt-8 mb-4'>
            <Tag name={libro.categoria} />
            <div className='text-gray-400'>{libro.numEjemplaresDisponibles}/{libro.numEjemplaresTotales}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

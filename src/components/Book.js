import React from 'react';
import Tag from './Tag';

export default function Book(props) {
  return (
    <div className='px-4 py-8 w-80'>
      <div className='bg-white shadow-2xl'>
        <div>
          <img
            className='w-full h-64 object-cover'
            alt='book cover'
            src={props.imagenPortada}
          />
        </div>
        <div className='px-4 py-2 mt-2 bg-white'>
          <h2 className='font-bold text-xl text-gray-800'>{props.titulo}</h2>
          <small className='text-gray-500 italic'>{props.autor}</small>
          <p className='sm:text-sm text-xs text-gray-700 mr-1 my-3'>
            {props.subtitulo.substring(0, 50)}
          </p>
          <div className='user flex items-center mt-8 mb-4'>
            <Tag name={props.categoria} />
          </div>
        </div>
      </div>
    </div>
  );
}

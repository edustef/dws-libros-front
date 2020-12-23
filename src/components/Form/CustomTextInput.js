import React from 'react';
import splitCamel from '../../utils/splitCamel';
import capitalize from '../../utils/capitalize';

export default function CustomTextInput({ name, error = '', ...props }) {
  const displayName = capitalize(splitCamel(name));
  return (
    <div>
      <label
        htmlFor={name}
        className='block text-xs font-semibold text-gray-600 uppercase'
      >
        {displayName}
      </label>
      <input
        name={name}
        id={`name`}
        placeholder={displayName}
        className='block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner'
      />
      <small className='text-red-400 italic'>{error}</small>
    </div>
  );
}

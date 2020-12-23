import React from 'react';
import Placeholder from '../Placeholder';
import TableHeadData from './TableHeadData';

export default function TableHead({ children }) {
  let placeholderHead = [];
  //placeholder
  for (let i = 0; i < 4; i++) {
    placeholderHead.push(
      <TableHeadData key={i}>
        <Placeholder />
      </TableHeadData>
    );
  }
  return (
    <thead className='bg-gray-100'>
      <tr>{children ? children : placeholderHead}</tr>
    </thead>
  );
}

function Table({ children }) {
  
  return (
    <table className='table-fixed overflow-x-scroll min-w-full mt-8 divide-y divide-gray-200'>
      {children}
    </table>
  );
}

export default Table;

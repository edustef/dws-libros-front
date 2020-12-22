function Table(props) {
  return (
    <table className='overflow-x-scroll mt-8 min-w-full divide-y divide-gray-200'>
      <thead className='bg-gray-100'>
        <tr>
          {props.headTitles.forEach(title => (
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {props.rows.forEach(row => (
          <tr class='hover:bg-gray-50'>
            {row.forEach(data => (
              <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {data}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

import splitCamel from '../utils/splitCamel';
import Placeholder from './Placeholder';

function Table({ rows }) {
  let headTitles = [];
  let tableRows = [];

  let headStyle =
    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ' +
    (!rows ? 'animate-pulse' : '');

  headTitles.push(
    <th scope='col' className={headStyle}>
      {!rows ? 'Loading...' : 'Empty'}
    </th>
  );
  for (let i = 0; i < 4; i++) {
    headTitles.push(
      <th
        key={i}
        scope='col'
        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider animate-pulse'
      >
        {!rows ? <Placeholder /> : ''}
      </th>
    );
  }

  if (rows && rows.length > 0) {
    headTitles = Object.keys(rows[0]).map(title => (
      <th
        key={title}
        scope='col'
        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
      >
        {splitCamel(title)}
      </th>
    ));

    tableRows = rows.map((row, key) => (
      <tr key={key} className='hover:bg-gray-50'>
        {Object.entries(row).map(([key, data]) => (
          <td
            key={key}
            className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'
          >
            {data}
          </td>
        ))}
      </tr>
    ));
  }
  return (
    <table className='overflow-x-scroll mt-8 min-w-full divide-y divide-gray-200'>
      <thead className='bg-gray-100'>
        <tr>{headTitles}</tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>{tableRows}</tbody>
    </table>
  );
}

export default Table;

export default function Query() {
  return (
    <form method='POST' className='mt-8 flex justify-between space-x-16'>
      <div className='flex space-x-2 items-center'>
        <label
          htmlFor='date-start'
          className='text-sm font-medium text-gray-700'
        >
          INICIO
        </label>
        <input
          type='date'
          name='date-start'
          id='date-start'
          className='border border-gray-300 px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500  rounded-md'
          placeholder='0.00'
        />
      </div>

      <div className='flex space-x-2 items-center'>
        <label htmlFor='date-end' className='text-sm font-medium text-gray-700'>
          FIN
        </label>
        <input
          type='date'
          name='date-end'
          id='date-end'
          className='border border-gray-300 px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500  rounded-md'
          placeholder='0.00'
        />
      </div>

      <button className='flex-grow text-white font-semibold px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-600'>
        Procesar
      </button>
    </form>
  );
}
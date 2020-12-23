import api from '../utils/api';

export default function AddRecord({ to, handlePost, thing }) {
  return (
    <button
      className='px-3 py-1 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold'
      onClick={handlePost}
    >
      Add new {thing}
    </button>
  );
}

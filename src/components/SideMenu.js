import { NavLink } from 'react-router-dom';
import './SideMenu.css';

function SideMenu() {
  return (
    <aside className='w-80 h-full bg-gray shadow-md w-fulll hidden sm:block'>
      <div className='flex flex-col h-full justify-between p-4 bg-gray-800'>
        <div className='text-sm'>
          <NavLink
            to='/'
            exact
            className='block bg-gray-900 text-white hover:bg-gray-700 hover:text-blue-300 p-2 rounded mt-2 cursor-pointer'
          >
            Prestamos
          </NavLink>
          <NavLink
            exact
            to='/libros'
            className='block bg-gray-900 justify-between items-center text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300'
          >
            Libros
          </NavLink>
          <NavLink
            exact
            to='/clientes'
            className='block bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300'
          >
            Clientes
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export default SideMenu;

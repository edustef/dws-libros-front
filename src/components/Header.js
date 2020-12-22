function Header() {
  return (
    <header className='w-full bg-gray-800 p-4 flex justify-between items-center'>
      <nav className='flex items-center'>
        <a className='text-white text-xl mr-2' href='/'>
          Libros
        </a>
        <div className='text-white text-xs hidden sm:block ml-2'></div>
      </nav>
      <div className='w-8 h-8 cursor-pointer'></div>
    </header>
  );
}

export default Header;

import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Clientes from './containers/Clientes';
import Prestamos from './containers/Prestamos';
import Libros from './containers/Libros';

function App() {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <main className='flex-grow overflow-y-auto flex w-full'>
        <SideMenu />
        <section className='overflow-y-auto space-y-6 overflow-x-auto w-full p-4'>
          <Route path='/' exact component={Prestamos} />
          <Route path='/libros' exact component={Libros} />
          <Route path='/clientes' exact component={Clientes} />
        </section>
      </main>
    </div>
  );
}

export default App;
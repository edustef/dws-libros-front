import { useState, useEffect } from 'react';
import api from '../utils/api';
import Query from '../components/Query';
import Table from '../components/Table';

function Libros() {
  const [libros, setLibros] = useState(null);

  useEffect(() => {
    api('/libros')
      .then(res => setLibros(res.data))
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1 className='text-5xl'>Libros</h1>
      <Query />
      <Table rows={libros} />
    </>
  );
}

export default Libros;

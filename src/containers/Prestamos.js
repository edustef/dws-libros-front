import { useEffect, useState } from 'react';
import api from '../utils/api';

import Query from '../components/Query';
import Table from '../components/Table';

function Prestamos() {
  const prestamosDetails = [
    'Activo',
    'Devuelto',
    'Sobrepasado una mes',
    'Sobrepasado un año',
  ];
  const [prestamos, setPrestamos] = useState(null);

  useEffect(() => {
    api('/prestamos')
      .then(res => {
        let tempPrestamos = res.data.map(prestamo => {
          prestamo.estado = prestamosDetails[prestamo.estado];
          return prestamo;
        });
        setPrestamos(tempPrestamos);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1 className='text-5xl'>Prestamos</h1>
      <Query />
      <Table rows={prestamos} />
    </>
  );
}

export default Prestamos;

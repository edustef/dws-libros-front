import { useEffect, useState } from 'react';
import api from '../utils/api';
import Table from '../components/Table/Table';
import CustomTextInput from '../components/Form/CustomTextInput';
import Modal from '../components/Modal';
import Button from '../components/Button';
import TableHead from '../components/Table/TableHead';
import TableBody from '../components/Table/TableBody';
import TableHeadData from '../components/Table/TableHeadData';

function Prestamos() {
  const [prestamos, setPrestamos] = useState(null);
  const [isPostPrestamo, setIsPostPrestamo] = useState(false);
  const [currentPrestamo, setCurrentPrestamo] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [errors, setErrors] = useState([]);

  const fetchData = () => {
    setPrestamos(null);
    api('/prestamos')
      .then(res => {
        setPrestamos(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const prestamosDetails = [
    'Activo',
    'Devuelto',
    'Sobrepasado una mes',
    'Sobrepasado un año',
  ];

  const handleFinalizar = async prestamo => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('isbn', prestamo.isbn);
    formData.append('dni', prestamo.dni);
    if (prestamo.estado !== '1') {
      formData.append('estado', '1');
    } else {
      formData.append('fechaFin', prestamo.fechaFin);
    }

    try {
      await api('/prestamos', {
        method: 'POST',
        data: formData,
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePost = async e => {
    e.preventDefault();
    setIsPosting(true);

    const formData = new FormData(e.target);

    try {
      let res = await api('/prestamos', {
        method: 'POST',
        data: formData,
      });
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        setIsPostPrestamo(false);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleEdit = async e => {
    e.preventDefault();
    setIsPosting(true);

    const formData = new FormData(e.target);
    formData.append('_method', 'PUT');
    formData.append('isbn', currentPrestamo.id);

    try {
      let res = await api('/prestamos', {
        method: 'POST',
        data: formData,
      });
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        setIsPostPrestamo(false);
        setCurrentPrestamo(null);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append('_method', 'DELETE');
    formData.append('isbn', currentPrestamo.id);

    try {
      await api('/prestamos', {
        method: 'POST',
        data: formData,
      });
    } catch (error) {
      console.log(error);
    } finally {
      fetchData();
    }
  };

  return (
    <>
      <h1 className='text-5xl'>Prestamos</h1>
      <button
        className='px-3 py-1 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold'
        onClick={() => setIsPostPrestamo(true)}
      >
        Añadir prestamo
      </button>
      {isPostPrestamo ? (
        <Modal handleModal={setIsPostPrestamo}>
          <form onSubmit={handlePost} className='space-y-3 px-3 py-4 mt-6'>
            <h1 className='text-2xl font-semibold text-center'>
              Añadir nuevo prestamo
            </h1>
            <CustomTextInput name='isbn' error={errors['isbn']} />
            <CustomTextInput name='dni' error={errors['dni']} />
            <div className='flex w-full gap-6'>
              <CustomTextInput
                name='fechaInicio'
                type='date'
                error={errors['fechaInicio']}
              />
              <CustomTextInput
                name='fechaFin'
                type='date'
                error={errors['fechaFin']}
              />
            </div>
            <button
              type='submit'
              className='w-full py-3 mt-6 font-medium tracking-widest rounded-md text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none'
            >
              {isPosting ? 'Posting...' : 'Nuevo prestamo'}
            </button>
          </form>
        </Modal>
      ) : null}
      {currentPrestamo ? (
        <Modal handleModal={setCurrentPrestamo}>
          <form onSubmit={handleEdit} className='space-y-3 px-3 py-4 mt-6'>
            <h1 className='text-2xl font-semibold text-center'>
              Edit {currentPrestamo.titulo} - {currentPrestamo.nombre}
            </h1>
            <div className='flex w-full gap-6'>
              <CustomTextInput
                defaultValue={currentPrestamo.fechaInicio}
                name='fechaInicio'
                type='date'
                error={errors['fechaInicio']}
              />
              <CustomTextInput
                defaultValue={currentPrestamo.fechaFin}
                name='fechaFin'
                type='date'
                error={errors['fechaFin']}
              />
            </div>
            <button
              type='submit'
              className='w-full py-3 mt-6 font-medium tracking-widest rounded-md text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none'
            >
              {isPosting ? 'Posting...' : 'Update prestamo'}
            </button>
          </form>
        </Modal>
      ) : null}
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
          <label
            htmlFor='date-end'
            className='text-sm font-medium text-gray-700'
          >
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
      <Table>
        <TableHead>
          {(function () {
            if (prestamos && prestamos.length > 0) {
              const { isbn, dni, ...headPrestamo } = prestamos[0];
              return Object.keys(headPrestamo).map(key => (
                <TableHeadData key={key}>{key}</TableHeadData>
              ));
            }
            return null;
          })()}
          <TableHeadData></TableHeadData>
        </TableHead>
        <TableBody>
          {prestamos ? (
            prestamos.map(prestamo => {
              let { isbn, dni, ...tempPrestamo } = prestamo;
              return (
                <tr key={isbn + dni} className='hover:bg-gray-50'>
                  {Object.entries(tempPrestamo).map(([key, prestamoData]) => (
                    <td
                      key={key}
                      className='px-6 py-4 truncate text-sm text-gray-500 max-w-sm'
                    >
                      {key === 'estado'
                        ? prestamosDetails[prestamo.estado]
                        : prestamoData}
                    </td>
                  ))}
                  <td
                    key='action'
                    className='px-6 py-4 truncate text-sm text-gray-500 max-w-sm'
                  >
                    {prestamo.estado === '1' ? (
                      <Button
                        handleAction={() => handleFinalizar(prestamo)}
                        color='gray'
                      >
                        Finalizado
                      </Button>
                    ) : (
                      <Button
                        handleAction={() => handleFinalizar(prestamo)}
                        color='green'
                      >
                        Finalizar
                      </Button>
                    )}
                    <Button handleAction={() => setCurrentPrestamo(prestamo)}>
                      Edit
                    </Button>
                    <Button handleAction={handleDelete} color='red'>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className='px-6 py-4 truncate text-sm text-gray-500 max-w-sm animate-pulse'>
                Loading...
              </td>
            </tr>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default Prestamos;

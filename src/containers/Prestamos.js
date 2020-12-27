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
    setPrestamos(null);
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('id', prestamo.id);
    if (prestamo.estado !== '1') {
      formData.append('estado', '1');
    } else {
      formData.append('estado', '0');
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
    formData.append('id', currentPrestamo.id);

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

  const handleDelete = async prestamo => {
    const formData = new FormData();
    formData.append('_method', 'DELETE');
    formData.append('id', prestamo.id);

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

  const handleQuery = async e => {
    setPrestamos(null);
    e.preventDefault();
    try {
      let res = await api('/prestamos', {
        params: {
          query: e.target.value,
        },
      });
      setPrestamos(res.data);
    } catch (error) {
      console.log(error);
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
      <div>
        <input
          id='query'
          name='query'
          className='ml-2 border px-3 py-1 shadow-md'
          type='text'
          placeholder='Buscar'
          onChange={handleQuery}
        />
      </div>
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
      <Table>
        <TableHead>
          {(function () {
            if (prestamos && prestamos.length > 0) {
              const { id, isbn, dni, ...headPrestamo } = prestamos[0];
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
              let { id, isbn, dni, ...tempPrestamo } = prestamo;
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
                    <Button
                      handleAction={() => handleDelete(prestamo)}
                      color='red'
                    >
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

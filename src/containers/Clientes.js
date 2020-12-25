import { useEffect, useState } from 'react';
import api from '../utils/api';
import Table from '../components/Table/Table';
import CustomTextInput from '../components/Form/CustomTextInput';
import Modal from '../components/Modal';
import Button from '../components/Button';
import TableHead from '../components/Table/TableHead';
import TableBody from '../components/Table/TableBody';
import TableHeadData from '../components/Table/TableHeadData';

function Clientes() {
  const [clientes, setClientes] = useState(null);
  const [isPostCliente, setIsPostCliente] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [errors, setErrors] = useState([]);

  const handlePost = async e => {
    e.preventDefault();
    setIsPosting(true);

    const formData = new FormData(e.target);

    await api('/clientes', {
      method: 'POST',
      data: formData,
    })
      .then(res => {
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          setIsPostCliente(false);
          fetchData();
        }
      })
      .catch(error => {
        console.log(error);
      });
    setIsPosting(false);
  };

  const fetchData = () => {
    setClientes(null);
    api('/clientes')
      .then(res => {
        setClientes(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => fetchData(), []);

  const handleEdit = async e => {
    e.preventDefault();
    setIsPosting(true);

    const formData = new FormData(e.target);
    formData.append('_method', 'PUT');
    formData.append('dni', currentCliente.dni);

    try {
      let res = await api('/clientes', {
        method: 'POST',
        data: formData,
      });
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        setIsPostCliente(false);
        setCurrentCliente(null);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleDelete = async dni => {
    const formData = new FormData();
    formData.append('_method', 'DELETE');
    formData.append('dni', dni);

    try {
      await api('/clientes', {
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
      <h1 className='text-5xl'>Clientes</h1>
      <button
        className='px-3 py-1 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold'
        onClick={() => setIsPostCliente(true)}
      >
        Añadir cliente
      </button>
      {isPostCliente ? (
        <Modal handleModal={setIsPostCliente}>
          <form onSubmit={handlePost} className='space-y-3 px-3 py-4 mt-6'>
            <h1 className='text-2xl font-semibold text-center'>
              Añadir nuevo cliente
            </h1>
            <CustomTextInput name='dni' error={errors['dni']} />
            <div className='flex gap-6'>
              <CustomTextInput name='nombre' error={errors['nombre']} />
              <CustomTextInput name='apellidos' error={errors['apellidos']} />
            </div>
            <CustomTextInput name='edad' type='number' error={errors['edad']} />
            <div className='flex gap-6'>
              <CustomTextInput name='direccion' error={errors['direccion']} />
              <CustomTextInput name='poblacion' error={errors['poblacion']} />
            </div>
            <div className='flex gap-6'>
              <CustomTextInput name='telefono' error={errors['telefono']} />
              <CustomTextInput
                name='email'
                type='email'
                error={errors['email']}
              />
            </div>
            <button
              type='submit'
              className='w-full py-3 mt-6 font-medium tracking-widest rounded-md text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none'
            >
              {isPosting ? 'Posting...' : 'Nuevo libro'}
            </button>
          </form>
        </Modal>
      ) : null}
      {currentCliente ? (
        <Modal handleModal={setCurrentCliente}>
          <form onSubmit={handleEdit} className='space-y-3 px-3 py-4 mt-6'>
            <h1 className='text-2xl font-semibold text-center'>
              Editar {`${currentCliente.nombre} ${currentCliente.apellidos}`}
            </h1>
            <div className='flex gap-6'>
              <CustomTextInput
                defaultValue={currentCliente.nombre}
                name='nombre'
                error={errors['nombre']}
              />
              <CustomTextInput
                defaultValue={currentCliente.apellidos}
                name='apellidos'
                error={errors['apellidos']}
              />
            </div>
            <CustomTextInput
              defaultValue={currentCliente.edad}
              name='edad'
              type='number'
              error={errors['edad']}
            />
            <div className='flex gap-6'>
              <CustomTextInput
                defaultValue={currentCliente.direccion}
                name='direccion'
                error={errors['direccion']}
              />
              <CustomTextInput
                defaultValue={currentCliente.poblacion}
                name='poblacion'
                error={errors['poblacion']}
              />
            </div>
            <div className='flex gap-6'>
              <CustomTextInput
                defaultValue={currentCliente.telefono}
                name='telefono'
                error={errors['telefono']}
              />
              <CustomTextInput
                defaultValue={currentCliente.email}
                name='email'
                type='email'
                error={errors['email']}
              />
            </div>
            <button
              type='submit'
              className='w-full py-3 mt-6 font-medium tracking-widest rounded-md text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none'
            >
              {isPosting ? 'Posting...' : 'Update cliente'}
            </button>
          </form>
        </Modal>
      ) : null}
      <Table>
        <TableHead>
          {(function () {
            if (clientes && clientes.length > 0) {
              const { dni, ...headCliente } = clientes[0];
              return Object.keys(headCliente).map(key => (
                <TableHeadData key={key}>{key}</TableHeadData>
              ));
            }
            return null;
          })()}
          <TableHeadData></TableHeadData>
        </TableHead>
        <TableBody>
          {clientes ? (
            clientes.map((cliente, key) => {
              const { dni, ...tempCliente } = clientes[0];
              return (
                <tr key={key} className='hover:bg-gray-50'>
                  {Object.entries(tempCliente).map(([key, clienteData]) => (
                    <td
                      key={key}
                      className='px-6 py-4 truncate text-sm text-gray-500 max-w-sm'
                    >
                      {clienteData}
                    </td>
                  ))}
                  <td
                    key='action'
                    className='px-6 py-4 truncate text-sm text-gray-500 max-w-sm'
                  >
                    <Button handleAction={() => setCurrentCliente(cliente)}>
                      Edit
                    </Button>
                    <Button
                      handleAction={() => handleDelete(cliente.dni)}
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

export default Clientes;

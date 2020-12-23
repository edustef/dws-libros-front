import { useEffect, useState } from 'react';
import api from '../utils/api';

import Query from '../components/Query';
import Table from '../components/Table';
import Modal from '../components/Modal';
import CustomTextInput from '../components/Form/CustomTextInput';

function Clientes() {
  const [clientes, setClientes] = useState(null);
  const [isModal, setIsModal] = useState(false);
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
        }
      })
      .catch(error => {
        console.log(error);
      });
    setIsPosting(false);
  };

  const handleModal = willModal => {
    setIsModal(willModal);
  };

  useEffect(() => {
    api('/clientes')
      .then(res => setClientes(res.data))
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1 className='text-5xl'>Clientes</h1>
      <button
        className='px-3 py-1 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold'
        onClick={handleModal}
      >
        Add new cliente
      </button>
      {isModal ? (
        <Modal handleModal={handleModal}>
          <form onSubmit={handlePost} className='space-y-3 px-3 py-4 mt-6'>
            <CustomTextInput name='dni' error={errors['dni']} />
            <CustomTextInput name='nombre' error={errors['nombre']} />
            <CustomTextInput name='apellidos' error={errors['apellidos']}/>
            <CustomTextInput name='edad' type='number' error={errors['edad']}/>
            <CustomTextInput name='direccion' error={errors['direccion']}/>
            <CustomTextInput name='poblacion' error={errors['poblacion']}/>
            <CustomTextInput name='telefono' error={errors['telefono']}/>
            <CustomTextInput name='email' type='email' error={errors['email']}/>
            <button
              type='submit'
              className='w-full py-3 mt-6 font-medium tracking-widest rounded-md text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none'
            >
              {isPosting ? 'Posting...' : 'Nuevo cliente'}
            </button>
          </form>
        </Modal>
      ) : (
        ''
      )}
      <Query />
      <Table rows={clientes} />
    </>
  );
}

export default Clientes;

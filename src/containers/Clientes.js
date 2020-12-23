import { useEffect, useState } from 'react';
import api from '../utils/api';

import Table from '../components/Table/Table';
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
        } else {
          setIsModal(false);
          fetchData();
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

  const fetchData = () => {
    api('/clientes')
      .then(res => setClientes(res.data))
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => fetchData(), []);

  return (
    <>
      <h1 className='text-5xl'>Clientes</h1>
      <button
        className='px-3 py-1 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold'
        onClick={handleModal}
      >
        Añadir cliente
      </button>
      {isModal ? (
        <Modal handleModal={handleModal}>
          <form onSubmit={handlePost} className='space-y-3 px-3 py-4 mt-6'>
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
      <Table rows={clientes} />
    </>
  );
}

export default Clientes;

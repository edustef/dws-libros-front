import { useState, useEffect } from 'react';
import api from '../utils/api';
import Book from '../components/Book';
import CustomTextInput from '../components/Form/CustomTextInput';
import CustomTextArea from '../components/Form/CustomTextArea';
import Modal from '../components/Modal';

function Libros() {
  const [libros, setLibros] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleModal = willModal => {
    setIsModal(willModal);
  };

  const fetchData = () => {
    api('/libros')
      .then(res => setLibros(res.data))
      .catch(error => {
        console.log(error);
      });
  };

  const handlePost = async e => {
    e.preventDefault();
    setIsPosting(true);

    const formData = new FormData(e.target);

    await api('/libros', {
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

  return (
    <>
      <h1 className='text-5xl'>Libros</h1>
      <button
        className='px-3 py-1 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold'
        onClick={handleModal}
      >
        Añadir libro
      </button>
      {isModal ? (
        <Modal handleModal={handleModal}>
          <form onSubmit={handlePost} className='space-y-3 px-3 py-4 mt-6'>
            <CustomTextInput name='isbn' error={errors['isbn']} />
            <CustomTextInput name='titulo' error={errors['titulo']} />
            <CustomTextInput name='subtitulo' error={errors['subtitulo']} />
            <CustomTextArea name='descripcion' error={errors['descripcion']} />
            <div className='flex gap-6'>
              <CustomTextInput name='autor' error={errors['autor']} />
              <CustomTextInput name='editorial' error={errors['editorial']} />
              <CustomTextInput name='categoria' error={errors['categoria']} />
            </div>
            <CustomTextInput
              name='imagenPortada'
              error={errors['imagenPortada']}
            />
            <div className='flex gap-6'>
              <CustomTextInput
                name='numEjemplaresTotales'
                type='number'
                error={errors['numEjemplaresTotales']}
              />
              <CustomTextInput
                name='numEjemplaresDisponibles'
                type='number'
                error={errors['numEjemplaresDisponibles']}
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
      <div className="flex">
      {libros ? libros.map(libro => <Book {...libro} />) : null}
      </div>
    </>
  );
}

export default Libros;

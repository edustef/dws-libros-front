import { useState, useEffect } from 'react';
import api from '../utils/api';
import Book from '../components/Book';
import CustomTextInput from '../components/Form/CustomTextInput';
import CustomTextArea from '../components/Form/CustomTextArea';
import Modal from '../components/Modal';

function Libros() {
  const [libros, setLibros] = useState(null);
  const [isPostLibro, setIsPostLibro] = useState(false);
  const [currentLibro, setCurrentLibro] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [errors, setErrors] = useState([]);

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
          setIsPostLibro(false);
          fetchData();
        }
      })
      .catch(error => {
        console.log(error);
      });
    setIsPosting(false);
  };

  const fetchData = () => {
    setLibros(null);
    api('/libros')
      .then(res => {
        setLibros(res.data);
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
    formData.append('isbn', currentLibro.isbn);

    try {
      let res = await api('/libros', {
        method: 'POST',
        data: formData,
      });
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        setIsPostLibro(false);
        setCurrentLibro(null);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleDelete = async isbn => {
    const formData = new FormData();
    formData.append('_method', 'DELETE');
    formData.append('isbn', isbn);

    try {
      await api('/libros', {
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
    setLibros(null);
    e.preventDefault();
    try {
      let res = await api('/libros', {
        params: {
          query: e.target.value,
        },
      });
      setLibros(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className='text-5xl'>Libros</h1>
      <button
        className='px-3 py-1 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold'
        onClick={() => setIsPostLibro(true)}
      >
        Añadir libro
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
      {isPostLibro ? (
        <Modal handleModal={setIsPostLibro}>
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
      {currentLibro ? (
        <Modal handleModal={setCurrentLibro}>
          <form onSubmit={handleEdit} className='space-y-3 px-3 py-4 mt-6'>
            <CustomTextInput
              defaultValue={currentLibro.titulo}
              name='titulo'
              error={errors['titulo']}
            />
            <CustomTextInput
              defaultValue={currentLibro.subtitulo}
              name='subtitulo'
              error={errors['subtitulo']}
            />
            <CustomTextArea
              defaultValue={currentLibro.descripcion}
              name='descripcion'
              error={errors['descripcion']}
            />
            <div className='flex gap-6'>
              <CustomTextInput
                defaultValue={currentLibro.autor}
                name='autor'
                error={errors['autor']}
              />
              <CustomTextInput
                defaultValue={currentLibro.editorial}
                name='editorial'
                error={errors['editorial']}
              />
              <CustomTextInput
                defaultValue={currentLibro.categoria}
                name='categoria'
                error={errors['categoria']}
              />
            </div>
            <CustomTextInput
              defaultValue={currentLibro.imagenPortada}
              name='imagenPortada'
              error={errors['imagenPortada']}
            />
            <div className='flex gap-6'>
              <CustomTextInput
                defaultValue={currentLibro.numEjemplaresTotales}
                name='numEjemplaresTotales'
                type='number'
                error={errors['numEjemplaresTotales']}
              />
              <CustomTextInput
                defaultValue={currentLibro.numEjemplaresDisponibles}
                name='numEjemplaresDisponibles'
                type='number'
                error={errors['numEjemplaresDisponibles']}
              />
            </div>
            <button
              type='submit'
              className='w-full py-3 mt-6 font-medium tracking-widest rounded-md text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none'
            >
              {isPosting ? 'Updating...' : 'Update libro'}
            </button>
          </form>
        </Modal>
      ) : null}
      <div className='flex'>
        {libros ? (
          libros.map(libro => (
            <Book
              key={libro.isbn}
              {...libro}
              handleDelete={handleDelete}
              setCurrentLibro={setCurrentLibro}
            />
          ))
        ) : (
          <p className='px-6 py-4 truncate text-sm text-gray-500 max-w-sm animate-pulse'>
            Loading...
          </p>
        )}
      </div>
    </>
  );
}

export default Libros;

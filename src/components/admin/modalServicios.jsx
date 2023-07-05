import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../utils/firebaseconfig';
import { toast } from 'react-toastify';

export default function ModalProfesionales({ handleModal, setIsLoading }) {
  // Estado para almacenar la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState(null);
  // Estado para almacenar el nombre de la imagen seleccionada
  const [nombreImagen, setNombreImagen] = useState('');
  // Estado para controlar si se está arrastrando una imagen
  const [dragging, setDragging] = useState(false);
  // Estado para almacenar los profesionales
  const [profesionales, setProfesionales] = useState([]);
  // Estado para almacenar los datos del servicio
  const [nombreSercivio, setNombreServicio] = useState('');
  const [precio, setPrecio] = useState('')

  // Obtener los profesionales al cargar el componente
  useEffect(() => {
    const consultarProfesionales = async () => {
      const docRef = doc(db, 'utilidades', 'profesionales');
      const profesionalesDoc = await getDoc(docRef);
      setProfesionales(profesionalesDoc.data().profesionales);
    };
    consultarProfesionales();
  }, []);


  // Manejar la subida de imágenes desde el input file
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setNombreImagen(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // Mostrar la imagen seleccionada
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar el evento de arrastrar el archivo sobre el contenedor de la imagen
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  // Manejar el evento de salir del área de arrastre
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  // Manejar el evento de soltar el archivo en el contenedor de la imagen
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // Modificar esta línea para mostrar la imagen seleccionada
      };
      reader.readAsDataURL(file);
      setNombreImagen(file.name);
    }
  };

  // Manejar el cambio de la imagen al hacer clic en el botón "Cambiar imagen"
  const handleImageChange = () => {
    setSelectedImage(null);
    document.getElementById('imageInput').click();
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage || precio === '' || nombreSercivio === '') {
      toast.error('Todos los campos son obligatorios', 'error')
      return;
  }

    try {
      setIsLoading(true)
      let downloadURL = '';

      // Subir la imagen al almacenamiento de Firebase
      if (selectedImage instanceof File) {
        const storageRef = ref(storage, nombreImagen);
        await uploadBytes(storageRef, selectedImage);
        downloadURL = await getDownloadURL(storageRef);
      } else {
        downloadURL = selectedImage;
      }

      // Obtener la colección de servicios
      const docRef = doc(db, 'utilidades', 'servicios');
      const serviciosDoc = await getDoc(docRef);
      const dataServicios = serviciosDoc.data();


      // Agregar un nuevo servicio
      dataServicios.servicio.push({
        img: downloadURL,
        nombre: nombreSercivio,
        precio: precio,
        fecha: 'Barbero',
      });


      // Actualizar los cambios en Firestore
      await updateDoc(docRef, dataServicios);
      handleModal();
      setIsLoading(false)
      toast.success('Sevicio añadido correctamente')
    } catch (error) {
      toast.error("Ups, algo salio mal.", "error")
      setIsLoading(false)
    }
  };

  return (
    <main className='h-screen w-screen fixed left-0 lg:pl-[250px] bg-[#474747]/40 flex flex-col items-center justify-center z-50'>
      {/* Modal */}
      <form onSubmit={handleSubmit} className='w-[328px] md:w-[636px] h-[630px] rounded-xl py-8 px-6 gap-y-6 bg-[#1e1e1e] flex flex-col mb-20 md:mb-0'>
        {/* Contenido del modal */}
        <article className='flex justify-between items-center '>
          <h2 className='font-bold text-2xl text-[#FDFFFC]'>Nuevo servicio</h2>
          <button onClick={() => {
            handleModal()
          }}>
            <img src='https://i.ibb.co/18mdwKB/close.png' alt='' />
          </button>
        </article>

        {/* contenedor campos */}
        <article className='flex flex-col'>
          <div className='flex flex-col max-h-[452px] overflow-y-scroll  gap-y-5 justify-between'>
            <div className=''>
              {/* Contenedor campo imagen */}
              <p className='text-[#FDFFFC] font-semibold text-base py-3 '>Foto del servicio</p>
              <div
                className={`w-full h-[120px] rounded-lg bg-[#474747] border-[#CAC7C7] border flex items-center justify-center ${dragging ? 'border-4 border-blue-500' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {!selectedImage ? (
                  <div className='flex items-center'>
                    <label htmlFor="imageInput" className="cursor-pointer text-[#FDFFFC] font-light text-[10px] flex flex-col gap-y-4 items-center ">
                      <img src="https://i.ibb.co/s6yHR7K/Vector-2.png" alt="Icono imagen" />
                      Sube o arrastra el archivo. Puede ser .jpg o .png
                    </label>
                  </div>
                ) : (
                  <div className='flex flex-col items-center gap-y-1 mt-16'>
                    <img src={selectedImage} alt="Selected" className="max-h-[100px] max-w-[170px]" />
                    <button
                      className="mt-4 bg-[#FDFFFC] text-[#1e1e1e] font-medium hover:bg-blue-600  py-2 px-4 rounded-md"
                      onClick={handleImageChange}
                    >
                      Cambiar imagen
                    </button>
                  </div>
                )}
                <input
                  id="imageInput"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              <p className='text-sm font-light text-[#FDFFFC] text-center py-4'> {!selectedImage && 'Sin archivo seleccionado'}</p>

            </div>

            {/* Campo Nombre */}
            <div className='flex flex-col gap-y-3'>
              <label className='font-semibold text-base text-[#FDFFFC]' htmlFor='nombre'>
                Nombre
              </label>
              <input
                type='text'
                id='nombre'
                className='p-4 rounded-xl border border-[#d9d9d9] bg-transparent  font-light text-[#FDFFFC] outline-none'
                placeholder='Nombre del servicio'
                value={nombreSercivio}
                onChange={(e) => setNombreServicio(e.target.value)}
              />
            </div>
            {/** Campo Precio */}
            <div className='flex flex-col gap-y-3'>
              <label className='font-semibold text-base text-[#FDFFFC]' htmlFor='precio'>
                Precio
              </label>
              <input
                type='number'
                id='precio'
                className='p-4 rounded-xl border border-[#d9d9d9] bg-transparent  font-light text-[#FDFFFC] outline-none'
                placeholder='Precio del servicio'
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>

            {/* Campo de profesionales a cargo */}
            {/* <div className='flex flex-col gap-y-3'>
              <label className='font-semibold text-base text-[#FDFFFC]'>profesionales a cargo</label>
              <div className='flex justify-between'>
                {profesionales?.map((servicio) => (
                  <div key={servicio.nombre} className='flex gap-2'>
                    <label className='font-light text-sm text-[#FDFFFC]'>
                      <input type='checkbox' name={servicio.nombre} className='mr-1' />
                      {servicio.nombre}
                    </label>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Botón enviar */}
        </article>
          <div className=' '>
            <button
              type='submit'
              className='w-[282px] rounded-lg bg-[#ffffff] py-[15px] px-6 font-semibold text-[#1E1E1E] text-base'>
              Agregar servicio
            </button>

          </div>
      </form>
    </main>
  );
}

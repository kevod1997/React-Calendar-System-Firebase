import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../utils/firebaseconfig';

export default function ModalProfesionales({ handleModal, profesional ,setProfesionalAEditar }) {
  // Estado para almacenar la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState(null);
  // Estado para almacenar el nombre de la imagen seleccionada
  const [nombreImagen, setNombreImagen] = useState('');
  // Estado para controlar si se está arrastrando una imagen
  const [dragging, setDragging] = useState(false);
  // Estado para almacenar los servicios
  const [servicios, setServicios] = useState([]);
  // Estado para almacenar el nombre del profesional
  const [nombreProfesional, setNombreProfesional] = useState('');

  // Obtener los servicios al cargar el componente
  useEffect(() => {
    const consultarServicios = async () => {
      const docRef = doc(db, 'utilidades', 'servicios');
      const serviciosDoc = await getDoc(docRef);
      setServicios(serviciosDoc.data().servicio);
    };
    consultarServicios();
  }, []);

  // Actualizar el formulario cuando se selecciona un profesional existente
  useEffect(() => {
    if (profesional) {
      setSelectedImage(profesional.img);
      setNombreImagen('');
      setNombreProfesional(profesional.nombre);
    }
  }, [profesional]);

  // Manejo de imágenes

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

    if (!selectedImage) {
      console.log('No se ha seleccionado ninguna imagen');
      return;
    }

    try {
      let downloadURL = '';

      // Subir la imagen al almacenamiento de Firebase
      if (selectedImage instanceof File) {
        const storageRef = ref(storage, nombreImagen);
        await uploadBytes(storageRef, selectedImage);
        downloadURL = await getDownloadURL(storageRef);
      } else {
        downloadURL = selectedImage;
      }

      // Obtener la colección de profesionales
      const docRefProfesionales = doc(db, 'utilidades', 'profesionales');
      const profesionalesDoc = await getDoc(docRefProfesionales);
      const profesionalesData = profesionalesDoc.data();
      
      if (Object.keys(profesional).length !== 0) {
        // Editar un profesional existente
        const index = profesionalesData.profesionales.findIndex(
          (profesionalItem) => profesionalItem.nombre === profesional.nombre
        );
        profesionalesData.profesionales[index].img = downloadURL;
        profesionalesData.profesionales[index].nombre = nombreProfesional;
      } else {
        // Agregar un nuevo profesional
        profesionalesData.profesionales.push({
          img: downloadURL,
          nombre: nombreProfesional,
          profesion: 'Barbero'
        });
      }

      // Actualizar los cambios en Firestore
      await updateDoc(docRefProfesionales, profesionalesData);

      console.log('Enviando formulario');
    } catch (error) {
      console.log('Error al cargar la imagen:', error);
    }
    handleModal();
  };

  return (
    <main className='h-screen w-screen fixed left-0 lg:pl-[250px] bg-[#474747]/40 flex flex-col items-center justify-center z-40'>
      {/* Modal */}
      <form onSubmit={handleSubmit} className='w-[328px] md:w-[636px] h-[672px] rounded-xl py-8 px-6 bg-[#1e1e1e] flex flex-col'>
        {/* Contenido del modal */}
        <article className='flex justify-between items-center'>
          <h2 className='font-bold text-2xl text-[#FDFFFC]'> {
                Object.keys(profesional).length !== 0 
                ? 'Editar Profesional'
                : 'Agregar Profesional'
              }
          </h2>
          <button onClick={() => {
            handleModal()
            setProfesionalAEditar({})
          }}>
            <img src='https://i.ibb.co/18mdwKB/close.png' alt='' />
          </button>
        </article>

        {/* contenedor cmapos */}
        <article className='flex flex-col'>
          <div className='flex flex-col h-[407px] gap-y-5 justify-between'>
            <div className=''>
               {/* Contenedor campo imagen */}
            <p className='text-[#FDFFFC] font-semibold text-base py-4 mt-3'>Foto del profesional</p>
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
                placeholder='Nombre del profesional'
                value={nombreProfesional}
                onChange={(e) => setNombreProfesional(e.target.value)}
              />
            </div>

            {/* Campo de serviicos a cargo */}
            <div className='flex flex-col gap-y-3'>
              <label className='font-semibold text-base text-[#FDFFFC]'>Servicios a cargo</label>
              <div className='grid grid-cols-2 gap-3 md:flex justify-between'>
                {servicios?.map((servicio) => (
                  <div key={servicio.nombre} className='flex gap-2'>
                    <label className='font-light text-sm text-[#FDFFFC]'>
                      <input type='checkbox' name={servicio.nombre} className='mr-1' />
                      {servicio.nombre}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Botón enviar */}
          <div className='flex justify-center mt-28'>
           <button
            type='submit' 
            className='w-[282px] rounded-lg bg-[#ffffff] py-[15px] px-6 font-semibold text-[#1E1E1E] text-base'>
              {
                Object.keys(profesional).length !== 0 
                ? 'Guardar Cambios'
                : 'Agregar Profesional'
              }
             
           </button>

         </div>
        </article>
      </form>
    </main>
  );
}

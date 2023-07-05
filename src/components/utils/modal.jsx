import React from 'react'
import Swal from 'sweetalert2'

export default function Modal({ 
    setModal,
    fecha, 
    hora, 
    servicioSeleccionado,
    handleSubmit
 }) {


        
const confirmarTurno =  () => {
    Swal.fire({
        icon: 'success',
        title: '¡turno confirmado!',
        text: 'En caso de no poder asistir, cancele el turno con anticipacion.',
      }).then((result) => {
        if (result.isConfirmed) {
          handleSubmit();
        }
      });
      setModal(false)
}

  return (
    <div className={`
    flex justify-center items-center  flex-col fixed top-0 right-0 left-0 bottom-0
     h-full w-full z-20 bg-black bg-opacity-70 
  `}>
        <div className='bg-white w-[24rem] sm:w-[30rem] h-52 relative rounded-xl'>
            <div onClick={()=> setModal(false)} className='absolute right-1 top-2 text-blue-500 text-2xl'>
            <ion-icon name="close-sharp"></ion-icon>
            </div>
            <div className='w-full h-full flex flex-col justify-evenly items-center bg-slate-100'>
                <h2 className='font-semibold uppercase text-xl text-slate-800 text-center '>¿Deseas Confirmar el turno?</h2>
                <p className='font-semibold text-lg text-slate-800'>El {fecha} a las {hora}hs</p>
                <p>{servicioSeleccionado}</p>
                <div className='flex gap-x-4'>
                    <input
                        onClick={() => confirmarTurno()} 
                        value='¡Confirmar Turno!' 
                        type="submit" 
                        className='p-2 uppercase cursor-pointer bg-blue-600 text-white shadow font-semibold rounded transition-colors duration-500'
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

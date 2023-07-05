import React from 'react'

export default function ModalDatosDelTurno({modalDatosDeTurno, setModalDatosDeTurno, handleModal}) {
    const { cliente, telefono, hora, servicio, profesional, estado} = modalDatosDeTurno;
  return (
   <div className='w-screen z-40 h-[100vh] top-0 bg-black/40  fixed flex flex-col justify-center items-center'>
     <div className='w-[328px]  mx-auto rounded-xl py-10 px-4 bg-[#1e1e1e] '>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-[22px] text-[#fdfffc]'>Detalles del turno</h2>
           <button onClick={() => setModalDatosDeTurno({})}>
             <img className='w-[15px]' src="https://i.ibb.co/DVsQG6m/close-1.png" alt="Cerrar" />
           </button>
        </div>
        <div className='flex flex-col gap-y-10 py-7'>
            <div className='flex justify-between items-center text-white'>
                <h3 className='text-sm font-medium'>Cliente</h3>
                <p className='text-sm font-normal'>{cliente}</p>
            </div>
            <div className='flex justify-between items-center text-white'>
                <h3 className='text-sm font-medium'>Telefono</h3>
                <div className='flex items-center gap-x-1 underline'>
                <ion-icon name="logo-whatsapp"></ion-icon>
                <a href={`https://wa.me/${telefono}`} className='font-medium text-sm'>{telefono}</a>
            </div>
            </div>
            <div className='flex justify-between items-center text-white'>
                <h3 className='text-sm font-medium'>Hora</h3>
                <p className='text-sm font-normal'>{hora}</p>
            </div>
            <div className='flex justify-between items-center text-white'>
                <h3 className='text-sm font-medium'>Servicio</h3>
                <p className='text-sm font-normal'>{servicio}</p>
            </div>
            <div className='flex justify-between items-center text-white'>
                <h3 className='text-sm font-medium'>Profesional</h3>
                <p className='text-sm font-normal'>{profesional}</p>
            </div>
            <div className='flex justify-between items-center text-white'>
                <h3 className='text-sm font-medium'>Estado</h3>
              <div className='bg-black rounded-lg p-[10px]'>
                  <p className={`font-medium text-sm  text-white`}>{estado}</p>
              </div>
            </div>
           
        </div>
        <div>
            <button 
            onClick={ () => { 
                handleModal()
                setModalDatosDeTurno({})
            }} 
            className='flex justify-center items-center gap-x-2 rounded-xl py-[15px] px-6 w-full bg-white text-[#1e1e1e] font-semibold text-sm'>
                <img src="https://i.ibb.co/VC2sk8c/delete-2.png" alt="Cancelar" />
                <p>Cancelar turno</p>
            </button>
        </div>
     </div>
   </div>
  )
}

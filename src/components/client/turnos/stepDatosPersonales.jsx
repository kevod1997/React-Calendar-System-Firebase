import React from 'react'

export default function StepDatosPersonales({ nombre, setNombre, telefono, setTelefono }) {
  
  return (
    <div className=' w-[90%] sm:w-full mx-auto flex flex-col justify-center  '>
      <div className='flex flex-col items-start gap-y-2 pt-28 lg:pt-20'>
        <label htmlFor="nombre">Nombre Completo</label>
        <input
          id='nombre'
          type="text"
          placeholder='Nombre completo'
          value={nombre} 
          onChange={e => setNombre(e.target.value)}
          className='w-full py-3 px-4 rounded-lg border border-[#1e1e1e] outline-[#1e1e1e]'       
          />
      </div>
      <div className='flex flex-col items-start gap-y-2 pt-10'>
        <label htmlFor="telefono">Telefono</label>
        <input
          id='telefono'
          type="number"
          placeholder=' ej: 223 633 4422'
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          className='w-full py-3 px-4 rounded-lg border border-[#1e1e1e] outline-[#1e1e1e]'       
          />
      </div>
    </div>
  )
}

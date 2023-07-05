import React from 'react'

export default function ResumenTurno({
    nombre,
    telefono,
    servicioSeleccionado,
    profesionalSeleccionado,
    fechaSeleccionada,
    resumen,
    handleResumen
}) {
    return (
        <>

            <aside
                className='
            w-full sm:w-[483px] col-span-1 right-0 bg-[#1e1e1e] h-screen py-[32px] pr-[63px] pl-[40px] hidden lg:block text-[#fdfffc]
      '>
                <div className='flex justify-between items-center mb-5'>
                    <h2 className='font-bold text-[#fdfffc] text-xl sm:text-2xl'>Resúmen de turno</h2>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <p className='font-medium  text-base sm:text-xl text-[#fdfffc]  '>Datos del cliente:</p>
                    <div className='flex flex-col gap-y-2'>
                        <div className='flex justify-between items-center'>
                            <p className='font-normal text-xs sm:text-lg text-[#fdfffc] '>Nombre</p>
                            <p className='font-light text-xs sm:text-lg text-[#fdfffc] '>{nombre === '' ? '-' : nombre} </p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-normal text-xs sm:text-lg text-[#fdfffc] '>Teléfono</p>
                            <p className='font-light text-xs sm:text-lg text-[#fdfffc] '>{telefono === 0 ? '-' : telefono}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2 '>
                        <p className='font-medium text-base sm:text-xl text-[#fdfffc]  '>Servicio</p>
                        <div className='flex justify-start items-center'>
                            {
                                !servicioSeleccionado?.img
                                    ? <div className='w-[66px] h-[90px] bg-gray-300 rounded-lg flex flex-col justify-center items-center'>
                                        <img src='https://i.ibb.co/YthSfQx/Vector.png' className='w-[15px] h-[15px]' alt='Sin foto del profesional' />
                                    </div>
                                    : <img
                                        src={servicioSeleccionado.img ?? '-'}
                                        alt={`imagen del servicio${servicioSeleccionado.nombre}`}
                                        className='w-[66px] h-[90px] rounded-lg object-cover'
                                    />
                            }
                            <div className='px-5'>
                                <p className='font-bold text-xl text-[#fdfffc] '>{servicioSeleccionado.nombre ?? '-'}</p>
                                <p className='font-bold text-lg text-[#fdfffc] '>$ {servicioSeleccionado.precio ? `$${servicioSeleccionado.precio}` : '-'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2 '>
                        <p className='font-medium text-base sm:text-xl text-[#fdfffc]  '>Profesional</p>
                        <div className='flex justify-start items-center'>
                            {
                                !profesionalSeleccionado?.img
                                    ? <div className='w-[66px] h-[90px] bg-gray-300 rounded-lg flex flex-col justify-center items-center'>
                                        <img src='https://i.ibb.co/YthSfQx/Vector.png' className='w-[15px] h-[15px]' alt='Sin foto del profesional' />
                                    </div>
                                    : <img
                                        src={profesionalSeleccionado.img ?? '-'}
                                        alt={`imagen del servicio${profesionalSeleccionado.nombre}`}
                                        className='w-[66px] h-[90px] rounded-lg object-cover '
                                    />
                            }
                            <p className='font-bold text-xl text-[#fdfffc]  px-5'>{profesionalSeleccionado.nombre ?? '-'}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2 '>
                        <p className='font-medium text-base sm:text-xl text-[#fdfffc]  '>Datos del turno</p>
                        <div className='flex flex-col gap-y-2'>
                            <div className='flex justify-between items-center'>
                                <p className='font-normal text-base sm:text-lg text-[#fdfffc] '>Dia </p>
                                <p className='font-light text-base sm:text-lg text-[#fdfffc] '>{fechaSeleccionada?.dia ? fechaSeleccionada.dia : '-'}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='font-normal text-base sm:text-lg text-[#fdfffc] '>Horario</p>
                                <p className='font-light text-base sm:text-lg text-[#fdfffc] '>{fechaSeleccionada?.hora ? `${fechaSeleccionada.hora}hs` : '-'}</p>
                            </div>
                            <div className='w-full border border-[#F2F2F2]'></div>
                            <div className='flex justify-between items-center'>
                                <p className='font-medium text-xl text-[#F2F2F2]'>Total</p>
                                <p className='font-bold text-xl text-[#F2F2F2]'>${servicioSeleccionado.precio ?? '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <aside
                className={`w-[90%] fixed bg-[#1e1e1e] h-screen py-[28px] pr-[56px] pl-[40px] block lg:hidden z-30
                transition-all duration-300 ease-in-out
                ${resumen ? 'right-0' : 'right-[-100%] '} 
    `}>
                <div className='flex justify-between items-center mb-8'>
                    <h2 className='font-bold text-white text-xl'>Resúmen de turno</h2>
                    <button
                        onClick={handleResumen}
                        className='lg:hidden'>
                        <img src="https://i.ibb.co/DVsQG6m/close-1.png" alt="cerrar resumen" />
                    </button>
                </div>
                <div className='flex flex-col gap-y-7'>
                    <p className='font-medium text-base text-white '>Datos del cliente:</p>
                    <div className='flex flex-col gap-y-2'>
                        <div className='flex justify-between items-center'>
                            <p className='font-normal text-xs text-white'>Nombre</p>
                            <p className='font-light text-xs text-white'>{nombre === '' ? '-' : nombre} </p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-normal text-xs text-white'>Teléfono</p>
                            <p className='font-light text-xs text-white'>{telefono === '' ? '-' : telefono}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-4 '>
                        <p className='font-medium text-base text-white '>Servicio</p>
                        <div className='flex justify-start items-center'>
                            {
                                !servicioSeleccionado?.img
                                    ? <div className='w-[66px] h-[90px] bg-gray-300 rounded-lg flex flex-col justify-center items-center'>
                                        <img src='https://i.ibb.co/YthSfQx/Vector.png' className='w-[15px] h-[15px]' alt='Sin foto del profesional' />
                                    </div>
                                    : <img
                                        src={servicioSeleccionado.img ?? '-'}
                                        alt={`imagen del servicio${servicioSeleccionado.nombre}`}
                                        className='w-[66px] h-[90px] rounded-lg object-cover'
                                    />
                            }
                            <div className='px-5'>
                                <p className='font-bold text-base text-white'>{servicioSeleccionado.nombre ?? '-'}</p>
                                <p className='font-bold text-xs text-white'>${servicioSeleccionado.precio ?? '-'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-4 '>
                        <p className='font-medium text-base text-white '>Profesional</p>
                        <div className='flex justify-start items-center'>
                            {
                                !profesionalSeleccionado?.img
                                    ? <div className='w-[66px] h-[90px] bg-gray-300 rounded-lg flex flex-col justify-center items-center'>
                                        <img src='https://i.ibb.co/YthSfQx/Vector.png' className='w-[15px] h-[15px]' alt='Sin foto del profesional' />
                                    </div>
                                    : <img
                                        src={profesionalSeleccionado.img ?? '-'}
                                        alt={`imagen del servicio${profesionalSeleccionado.nombre}`}
                                        className='w-[66px] h-[90px] rounded-lg object-cover '
                                    />
                            }
                            <p className='font-bold text-base text-white px-5'>{profesionalSeleccionado.nombre ?? '-'}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-4 '>
                        <p className='font-medium text-base text-white '>Datos del turno</p>
                        <div className='flex flex-col gap-y-2'>
                            <div className='flex justify-between items-center'>
                                <p className='font-normal text-xs text-white'>Dia </p>
                                <p className='font-light text-xs text-white'>{fechaSeleccionada?.dia ? fechaSeleccionada.dia : '-'}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='font-normal text-xs text-white'>Horario</p>
                                <p className='font-light text-xs text-white'>{fechaSeleccionada?.hora ? `${fechaSeleccionada.hora}hs` : '-'}</p>
                            </div>
                            <div className='w-full border border-[#F2F2F2]'></div>
                            <div className='flex justify-between items-center'>
                                <p className='font-medium text-base text-[#F2F2F2]'>Total</p>
                                <p className='font-bold text-base text-[#F2F2F2]'>${servicioSeleccionado.precio ?? '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

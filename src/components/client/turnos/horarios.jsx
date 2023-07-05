import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import HoraTurno from './horaTurno'

export default function Horarios({ horarios, setHora, setModal }) {
   

    return (
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-5'>
            {
        horarios?.length
                ? horarios.map(horaTurno => (
                    <HoraTurno  key={horaTurno.hora} setModal={setModal} horaTurno={horaTurno} setHora={setHora} />
                ))
                : <p className='text-center text-xl font-semibold text-red-700 col-span-full my-8'>No hay turnos para este dia</p>
            }
        </div>
    )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alerta from '../../utils/alerta'

export const BotonCancelar = () => {

    const navigate = useNavigate()

    const [modal, setModal] = useState(false)

    return (
        <>
        
        {
            modal 
            ?<Alerta
                titulo={'Cancelar reserva'}
                texto={'¿Estás seguro de cancelar la reserva? Podras realizar otra nuevamente cuando gustes.'}
                txtBtnCancelar={'No, seguir reservando.'}
                txtBtnConfirmar={'Si, cancelar reserva.'}
                cancelar={() => setModal(false)}
                confirmar={() => navigate(-1)}
            />
            :''
        }
        <button
            type='button'
            className='py-3 px-5 h-[51px] border border-stone-900 w-[328px] lg:w-[356px] text-stone-900 bg-white font-semibold text-lg rounded-md'
            onClick={() => setModal(true)}
        >
            Cancelar reserva
        </button>
        
        </>
    )
}
export const BotonAvanzar = ({ step, setStep }) => {
    return (
        <button
            type='button'
            className='py-3 px-5 h-[51px] w-[328px] lg:w-[356px] bg-stone-900 text-white font-medium text-lg rounded-md flex justify-center items-center gap-2'
            onClick={() => setStep(step + 1)}
        >
            Siguiente paso
            <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
    )
}

export const BotonAvanzarDeshabilitado = ({ step }) => {
    return (
        <button
            type='button'
            className='py-3 px-5 h-[51px] w-[328px] lg:w-[356px] bg-gray-400 text-white font-medium text-lg rounded-md flex justify-center items-center gap-2 '
            disabled
        >
            {step === 3 ? 'Confirmar turno' : 'Siguiente paso'}
            <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
    )
}

export const BotonConfirmarTurno = () => {
    return (
        <button
            type='submit'
            className='py-3 px-5 h-[51px] w-[328px] lg:w-[356px] bg-stone-900 text-white font-medium text-lg rounded-md flex justify-center items-center gap-2'
        >
            Confirmar turno
            <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
    )
}

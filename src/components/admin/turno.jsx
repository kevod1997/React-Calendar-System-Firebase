import React, { useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig';
import Alerta from '../utils/alerta';
import PantallaCargando from '../utils/pantallaCargando'



export default function Turno({ turno, index, handleModal, modal, setModalDatosDeTurno }) {

    
    const [ isLoading, setIsLoading ] = useState(false)


    const { cliente, telefono, hora, servicio, profesional, estado, userId, turnoId } = turno;

    console.log(userId)

 
    const cancelarTurno = async () => {

        setIsLoading(true)
        // Eliminando el turno activo en el documento del usuario
        const docRefUser = doc(db, 'usuarios', userId);
        const docUser = await getDoc(docRefUser);
        const turnosActivos = docUser.data().turnosActivos;
        const turnosActivosActualizados = turnosActivos.filter(
          turnoActivo => turnoActivo.turnoId !== turnoId
        );
      
        await updateDoc(docRefUser, {
          turnosActivos: turnosActivosActualizados
        });

        console.log('Turno Activo del cliente eliminado')

        // Cambiamos la disponibilidad del turno para que este disponible nuevamente
        const docRefHoras = doc(db, 'horarios', turno.dia)
        const horaFirebase = await getDoc(docRefHoras)
        const horas = horaFirebase.data()

        const encontrarHora = horas.horariosLaborales.findIndex(obj => obj.hora === turno.hora)
        if (encontrarHora !== -1) {
            horas.horariosLaborales[encontrarHora] = {
                ...horas.horariosLaborales[encontrarHora],
                disponible: true
            };
        }
        await updateDoc(docRefHoras, horas)
        console.log('Horario disponible para todo el publico')

        // Cambiar estado a cancelado en admin
        const docRefTurno = doc(db, 'Turnos', turno.dia)
        const docTurno = await getDoc(docRefTurno)
        const turnos = docTurno.data()
        const encontrarTUrno = turnos.turnos.findIndex(obj => obj.id === turno.id)
        if (encontrarTUrno !== -1) {
            turnos.turnos[encontrarTUrno] = {
                ...turnos.turnos[encontrarTUrno],
                estado: 'cancelado'
            };
        }
        await updateDoc(docRefTurno, turnos)
        console.log('Estado de turno actualizado')
        handleModal()
        setModalDatosDeTurno({})
        setIsLoading(false)
    }


    return (
        <div
            className={
                `grid grid-cols-[3fr,3fr,1fr,1fr] 
                sm:grid-cols-[2fr,2fr,2fr,2fr,1fr]
                md:grid-cols-[2fr,2fr,2fr,2fr,2fr,2fr,1fr]
                lg:grid-cols-7 
                place-items-start  content-center justify-center items-center py-4 px-2 xl:px-10 text-[#2d2d2d] 
        ${index % 2 === 0 ? 'bg-white' : 'bg-[#2d2d2d]/10'}
        `}
        >
            

            <PantallaCargando isLoading={isLoading}/>

            <p className='font-light text-sm'>{cliente}</p>
            <div className='flex items-center gap-x-1 underline'>
                <ion-icon name="logo-whatsapp"></ion-icon>
                <a href={`https://wa.me/${telefono}`} className='font-medium text-sm'>{telefono}</a>
            </div>
            <p className='font-light text-sm'>{hora}</p>
            <p className='font-light text-sm hidden sm:block'>{profesional}</p>
            <p className='font-light text-sm hidden md:block'>{servicio}</p>
            <p className={`font-medium text-sm hidden md:block ${estado === 'confirmado' ? 'text-green-600' : 'text-red-600'}`}>{estado}</p>
            <button
                className='lg:mx-7 hidden md:block'
                onClick={estado === 'cancelado' ? null : () => handleModal()}
            >
                <img src="https://i.ibb.co/KwQGXF8/delete-3.png" alt="icono cancelar turno" />
            </button>
            <button 
                className='md:hidden   pl-7'
                onClick={() => setModalDatosDeTurno(turno)}
                >
                <img src="https://i.ibb.co/sqMv74d/more-vert.png" alt="Ver más" />
            </button>


            {
                modal &&
                <Alerta
                    titulo={'Cancelar reserva'}
                    texto={`¿Estás seguro de cancelar la reserva? El horario se habilitara para que otra persona pueda reservar.`}
                    txtBtnCancelar={'No, conservar.'}
                    txtBtnConfirmar={'Si, cancelar.'}
                    cancelar={handleModal}
                    confirmar={cancelarTurno}
                />
            }
        </div>

    )
}

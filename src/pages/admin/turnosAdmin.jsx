import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { format } from 'date-fns';
import Calendar from '../../components/utils/calendar';
import Turno from '../../components/admin/turno';
import DashBoard from '../../components/admin/dashBoard';
import ModalDatosDelTurno from '../../components/admin/modalDatosDelTurno';


export default function TurnosAdmin() {
    const [turnos, setTurnos] = useState([])
    const [selectedDay, setSelectedDay] = useState(new Date());

    // Modal para ver los datos del turno
    const [ modalDatosDeTurno, setModalDatosDeTurno  ] = useState({})

    // Modal para xancelar el turno
    const [modal, setModal] = useState(false)
    const handleModal = () => {
        setModal(!modal)
    }
    // Estado para manejar la apertura del calendario
    const [isOpen, setIsOpen] = useState(false);
    const fechaFormateada = format(selectedDay, 'dd-MM');
    console.log(fechaFormateada)


    const consultarTurnos = () => {
        const docRef = doc(db, 'Turnos', fechaFormateada)
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setTurnos(snapshot.data().turnos)
        })
        console.log(turnos)
        return () => {
            unsubscribe()
        }
    }



    useEffect(() => {
        consultarTurnos();
        console.log(turnos)
    }, [selectedDay]);

    useEffect(() => {
        consultarTurnos();
    }, []); // Llamar al cargar el componente


    const handleDateChange = (date) => {
        setSelectedDay(date);
        setIsOpen(!isOpen);
    }

    return (
       <>
       <DashBoard />
         <main className='lg:ml-[250px] '>
            {Object.keys(modalDatosDeTurno).length !== 0 
            && <ModalDatosDelTurno modalDatosDeTurno={modalDatosDeTurno} setModalDatosDeTurno={setModalDatosDeTurno} handleModal={handleModal}/> 
            }
             <section className='flex justify-start p-10 text-[#1e1e1e] '>
                 <article className='flex flex-col gap-y-5 z-20'>
                     <h2 className='text-2xl font-semibold'>Agenda del dia</h2>
                     <Calendar
                         selectedDay={selectedDay}
                         setSelectedDay={setSelectedDay}
                         handleDateChange={handleDateChange}
                         isOpen={isOpen}
                         setIsOpen={setIsOpen}
                     />
                 </article>
             </section>
             <section>

                 <article className='
                     grid grid-cols-[3fr,3fr,1fr,1fr]  
                     sm:grid-cols-[2fr,2fr,2fr,2fr,1fr]
                     md:grid-cols-[2fr,2fr,2fr,2fr,2fr,2fr,1fr]
                     lg:grid-cols-7 
                     place-items-start  px-2 xl:px-10 text-sm xl:text-base '
                 >
                     <p className='font-normal '>Cliente</p>
                     <p className='font-normal '>Telefono</p>
                     <p className='font-normal '>Hora</p>
                     <p className='font-normal hidden sm:block'>Profesional</p>
                     <p className='font-normal hidden md:block'>Servicio</p>
                     <p className='font-normal hidden md:block'>Estado</p>
                     <p className='font-normal hidden md:block'>Cancelar</p>
                     <p className='font-normal md:hidden block place-items-end place-self-end'> más</p>
                 </article>
                 <article>
                     {turnos.length !== 0 ? (
                         turnos.map((turno, index) => (
                             <Turno 
                                key={turno.turnoId} 
                                turno={turno} 
                                index={index}
                                modal={modal}
                                handleModal={handleModal}
                                setModalDatosDeTurno={setModalDatosDeTurno}
                                />
                         ))
                     ) : (
                         <p>No hay turnos para este día aún</p>
                     )}
                 </article>
             </section>
         </main>
       </>
    )
}

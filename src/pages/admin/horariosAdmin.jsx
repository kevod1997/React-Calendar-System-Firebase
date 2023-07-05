import { useState, useEffect } from 'react'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { format } from 'date-fns';
import Calendar from '../../components/utils/calendar';
import Horario from '../../components/admin/horario';
import PantallaCargando from '../../components/utils/pantallaCargando'

import Switch from 'react-switch'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from '../../components/admin/dashBoard';



export default function HorariosAdmin() {
  const [horarios, setHorarios] = useState([])
  const [selectedDay, setSelectedDay] = useState(new Date());

  const [periodoHorario, setPeriodoHorario] = useState('mañana')
  const filtarHorariosPorPeriodo = horarios.filter(horario => horario.periodo === periodoHorario)

  const [horariosModificados, setHorariosModificados] = useState([]);


  // Estado para manejar la apertura del calendario
  const [isOpen, setIsOpen] = useState(false);
  const fechaFormateada = format(selectedDay, 'dd-MM');
  console.log(horariosModificados)

  const [isLoading, setIsLoading] = useState(false)


  const consultarHorarios = () => {
    const docRef = doc(db, 'horarios', fechaFormateada)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setHorarios(snapshot.data().horariosLaborales)
    })
    console.log(horarios)
    return () => {
      unsubscribe()
    }
  }

  useEffect(() => {
    consultarHorarios();
    setHorariosModificados([])
    checkInitialAvailability();
  }, [selectedDay]);

  useEffect(() => {
    consultarHorarios();
    checkInitialAvailability();
  }, []); // Llamar al cargar el componente

  const [switchEnabled, setSwitchEnabled] = useState(false);

  const checkInitialAvailability = async () => {
    const docRef = doc(db, 'horarios', fechaFormateada);
    const docHorarios = await getDoc(docRef);
    const dataHorarios = docHorarios.data().horariosLaborales;

    const hasAvailability = dataHorarios.some(horario => horario.disponible);

    setSwitchEnabled(hasAvailability);
  };


  const deshabilitarTodoLosTurnos = async () => {
    setIsLoading(true)
    const docRef = doc(db, 'horarios', fechaFormateada);
    const docHorarios = await getDoc(docRef);
    const dataHorarios = docHorarios.data().horariosLaborales;

    // Actualizar el campo 'disponible' de todos los horarios a 'false'
    const nuevosHorarios = dataHorarios.map(horario => ({
      ...horario,
      disponible: false
    }));

    // Guardar los horarios actualizados en Firestore
    await updateDoc(docRef, { horariosLaborales: nuevosHorarios });
    setIsLoading(false)
    toast.success('Todos los turnos deshabilitados correctamente')
  }
  const habilitarTodosLosTurnos = async () => {
    setIsLoading(true)
    const docRef = doc(db, 'horarios', fechaFormateada);
    const docHorarios = await getDoc(docRef);
    const dataHorarios = docHorarios.data().horariosLaborales;

    // Actualizar el campo 'disponible' de todos los horarios a 'false'
    const nuevosHorarios = dataHorarios.map(horario => ({
      ...horario,
      disponible: true
    }));

    // Guardar los horarios actualizados en Firestore
    await updateDoc(docRef, { horariosLaborales: nuevosHorarios });
    setIsLoading(false)
    toast.success('Todos los turnos habilitados correctamente')
  }


  const handleDateChange = (date) => {
    setSelectedDay(date);
    setIsOpen(!isOpen);
  }


  const guardarCambios = async () => {
    try {
      setIsLoading(true)
      // Obtiene una copia del arreglo horarios
      const horariosActualizados = [...horarios];

      // Actualiza los horarios modificados según los cambios en horariosModificados
      horariosModificados.forEach((horarioModificado) => {
        const horarioExistente = horariosActualizados.find((horario) => horario.id === horarioModificado.id);
        if (horarioExistente) {
          horarioExistente.disponible = horarioModificado.disponible;
        }
      });

      // Actualiza los horarios en Firestore
      const docRef = doc(db, 'horarios', fechaFormateada);
      await updateDoc(docRef, { horariosLaborales: horariosActualizados });
      consultarHorarios()

      console.log('Horarios actualizados correctamente');
      setHorariosModificados([])
      toast.success('Horarios actualizados correctamente')
      setIsLoading(false)
    } catch (error) {
      console.error('Error al actualizar los horarios:', error);
    }
  };


  return (
  <>
  <DashBoard/>
      <main className='lg:ml-[250px] p-3 md:p-10 flex flex-col gap-y-7'>
        <ToastContainer />
        <section>
          <article className='flex flex-col gap-y-5 items-start '>
            <h1 className='font-semibold text-2xl'>Horarios</h1>
            <p className='font-ligh text-lg'>Amet minim mollit non deserunt ullamco est sit aliquastrud amet.</p>
          </article>
          <article className='flex flex-col gap-y-5 items-start mt-10'>
            <h2 className='font-semibold text-xl'>Horarios del día {''}</h2>
            <div className='flex flex-col gap-3 md:flex-row justify-between w-full'>
              <div className='flex gap-x-5'>
                <Calendar
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  handleDateChange={handleDateChange}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </div>
    
              <div className='flex gap-x-3'>
                <p className='font-medium text-lg'>{switchEnabled ? 'Turnos Habilitados' : 'Turnos Deshabilitados'}</p>
                <Switch
                  checked={switchEnabled}
                  onChange={async () => {
                    if (switchEnabled) {
                      deshabilitarTodoLosTurnos(); // Deshabilitar los turnos
                    } else {
                      habilitarTodosLosTurnos();
                    }
                    setSwitchEnabled(!switchEnabled);
                  }}
                  onColor="#CCCCCC"
                  offColor="#CCCCCC"
                  handleDiameter={20}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onHandleColor='#000'
                  offHandleColor="#837e7e"
                />
              </div>
            </div>
          </article>
        </section>

        <section>
          {
            horarios.length !== 0 ? (
              <article className='flex flex-col gap-x-12'>
                <div className='w-full flex flex-col md:flex-row'>
                  <div className='w-full md:w-[20%] flex justify-center md:flex-col'>
                    <button
                      onClick={() => setPeriodoHorario('mañana')}
                      className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoHorario === 'mañana' ? 'font-semibold border-b-[5px] md:border-l-[5px] border-black' : 'font-light'}`}
                    >
                      Mañana
                    </button>
                    <button
                      onClick={() => setPeriodoHorario('tarde')}
                      className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoHorario === 'tarde' ? 'font-semibold border-b-[5px] md:border-l-[5px] border-black' : 'font-light'}`}
                    >
                      Tarde
                    </button>
                  </div>
                  <div className='  flex  my-5 flex-col justify-start h-[200px] overflow-y-auto'>
                    <div className='w-full lg:w-[800px] flex flex-wrap gap-3'>
                      {
                        filtarHorariosPorPeriodo?.map((horario, i) => (
                          <Horario
                            key={i}
                            horario={horario}
                            horariosModificados={horariosModificados}
                            setHorariosModificados={setHorariosModificados}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className='flex justify-center '>
                  {
                    isLoading && <PantallaCargando isLoading={isLoading} />
                  }
                  <button
                    onClick={horariosModificados.length !== 0 ? () => guardarCambios() : null}
                    className={`
                    ${horariosModificados.length !== 0 ? 'bg-[#1e1e1e]' : 'bg-gray-400'} 
                    px-3 py-2  text-white
                    `}>
                    Guardar cambios
                  </button>
                </div>
              </article>
            ) : (
              <article className='h-[150px] flex justify-center'>
                <p className='text-2xl text-[#1e1e1e] text-center'>No hay turnos para este día</p>
              </article>
            )
          }
        </section>
      </main>
  </>
  )
}

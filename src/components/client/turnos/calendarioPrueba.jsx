import { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseconfig';
import { motion } from 'framer-motion'; // Importar el módulo motion de Framer Motion

import Turnos from './turnos';

export default function CalendarioPrueba({ fechaSeleccionada, setFechaSeleccionada }) {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const [startDay, setStartDay] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(startDay);
  const fechaFormateada = format(selectedDay, 'dd-MM');

  const [turnos, setTurnos] = useState([]);
  const [periodoTurno, setPeriodoTurno] = useState('mañana');
  const filtrarTurnosPorPeriodo = turnos.filter(turno => turno.periodo === periodoTurno)

  const diaAbreviado = daysOfWeek[selectedDay.getDay()].slice(0, 3);

  // Establecer el número de días visibles según el ancho de la ventana
  const [limitDays, setLimitDays] = useState(window.innerWidth <= 768 ? 5 : 10);

  useEffect(() => {
    // Función para manejar el cambio de tamaño de la ventana
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setLimitDays(5);
      } else if (window.innerWidth < 1100) {
        setLimitDays(7);
      } else {
        setLimitDays(10);
      }
    };

    // Agregar el listener al evento resize de la ventana
    window.addEventListener('resize', handleResize);

    // Eliminar el listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Obtener los turnos para la fecha seleccionada
    const unsubscribe = onSnapshot(doc(db, 'horarios', fechaFormateada), (doc) => {
      setTurnos(doc.data()?.horariosLaborales ?? []);
      console.log(turnos);
    });

    // Eliminar el listener al desmontar el componente
    return () => unsubscribe();
  }, [selectedDay]);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  // Generar una matriz de días a partir del día de inicio
  const maxDaysAfterCurrent = 14; // Máximo número de días después del día actual
  const days = [];
  for (let i = 0; i < limitDays; i++) {
    const day = new Date(startDay);
    day.setDate(startDay.getDate() + i);
    days.push(day);
  }

  const handlePreviousClick = () => {
    const currentDate = new Date();
    const newStartDay = new Date(startDay);
    newStartDay.setDate(startDay.getDate() - 4);

    if (newStartDay >= currentDate) {
      setStartDay(newStartDay);
    } else {
      setStartDay(currentDate);
    }
  };

  const handleNextClick = () => {
    const currentDate = new Date();
    const limitDate = new Date(currentDate);
    limitDate.setDate(currentDate.getDate() + maxDaysAfterCurrent); // Límite de días después del día actual

    const newStartDay = new Date(startDay);
    newStartDay.setDate(startDay.getDate() + 4);

    if (newStartDay <= limitDate) {
      setStartDay(newStartDay);
    }
  };

  const isCurrentDay = (day) => {
    const currentDate = new Date();
    return day.toDateString() === currentDate.toDateString();
  };

  const getDayAbbreviation = (day) => {
    const options = { weekday: 'short' };
    return day.toLocaleDateString('es-ES', options).substring(0, 3);
  };

  const monthOptions = { month: 'long', year: 'numeric' };
  const currentMonth = startDay.toLocaleDateString('es-ES', monthOptions);

  return (
    <div className='w-full flex flex-col gap-y-3 md:gap-y-10'>
      <div className='w-full flex justify-center items-center'>
        <p className='text-xl font-medium'>{currentMonth}</p>
      </div>
      <div className='flex justify-around'>
        <button type='button' onClick={handlePreviousClick}>
          <ion-icon name='arrow-back'></ion-icon>
        </button>
        <div className='flex items-center gap-2'>
          {days.map((day) => (
            <motion.div // Agregar el contenedor motion
              key={day.toISOString()}
              onClick={() => handleDayClick(day)}
              className={`w-[58px] h-[70px] sm:w-[63px] sm:h-[76px] cursor-pointer
              py-2 px-4 flex flex-col items-center gap-2 sm:gap-3 rounded-lg 
              ${isCurrentDay(day) ? 'border border-black' : ''} 
              ${selectedDay.toDateString() === day.toDateString() ? 'bg-black text-white' : ''}`}
              initial={{ opacity: 0 }} // Definir la animación inicial
              animate={{ opacity: 1 }} // Definir la animación al entrar
              transition={{ duration: 1.2 }} // Definir la duración de la transición
            >
              <div>{day.getDate()}</div>
              <div>{getDayAbbreviation(day)}</div>
            </motion.div>
          ))}
        </div>
        <button type='button' onClick={handleNextClick}>
          <ion-icon name='arrow-forward'></ion-icon>
        </button>
      </div>
      <Turnos
        turnos={turnos}
        periodoTurno={periodoTurno}
        setPeriodoTurno={setPeriodoTurno}
        filtrarTurnosPorPeriodo={filtrarTurnosPorPeriodo}
        selectedDay={selectedDay}
        fechaSeleccionada={fechaSeleccionada}
        setFechaSeleccionada={setFechaSeleccionada}
        diaAbreviado={diaAbreviado}
        objetoDiaSeleccionado={selectedDay}
      />
    </div>
  );
}

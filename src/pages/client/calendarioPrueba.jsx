import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { generarDocumentoPorCadaDiaDisponible } from '../../utils/horariosLaborales'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebaseconfig';

export default function SteoFechaYHora() {
  // turnos
  const [turnos, setTurnos] = useState([])
  const [periodoTurno, setPeriodoTurno] = useState('mañana')
  const filtrarTurnosPorPeriodo = turnos.filter(turno => turno.periodo === periodoTurno)


  // calendario
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  let currentDate = new Date();
  if (!(currentDate instanceof Date && !isNaN(currentDate))) {
    currentDate = new Date();
  }
  currentDate.setHours(0, 0, 0, 0);
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(monthsOfYear[selectedDay.getMonth()]);

  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDay();
  const currentWeekStart = new Date(currentDate.getFullYear(), currentMonth, currentDate.getDate() - currentDay);
  const [currentWeekStartDay, setCurrentWeekStartDay] = useState(currentWeekStart);
  const thirtyDaysLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 30);

  useEffect(() => {
    const middleDate = new Date(currentWeekStartDay.getFullYear(), currentWeekStartDay.getMonth(), currentWeekStartDay.getDate() + 3);
    setSelectedMonth(monthsOfYear[middleDate.getMonth()]);
    // console.log(middleDate.getDate());
    // const fechaFormateada = format(middleDate, 'dd-MM');
    setSelectedDay(middleDate)

  }, [currentWeekStartDay]);

  useEffect(() => {
    handleDayClick(currentDate)
  }, [])

  const fechaFormateada = format(selectedDay, 'dd-MM');
  console.log(fechaFormateada)

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedMonth(monthsOfYear[day.getMonth()]);
    setCurrentWeekStartDay((prevWeekStartDay) => {
      const diff = Math.floor((day - prevWeekStartDay) / (24 * 60 * 60 * 1000));
      const newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() + diff - 3);
      return newWeekStart;
    });
  };
  const handlePrevWeek = () => {
    setCurrentWeekStartDay((prevWeekStartDay) => {
      const newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() - 4);
      const maxPrevDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      const minPrevDate = new Date(maxPrevDate.getFullYear(), maxPrevDate.getMonth(), maxPrevDate.getDate() - 3);
      if (newWeekStart < minPrevDate) {
        return minPrevDate;
      } else if (newWeekStart <= thirtyDaysLater) {
        return newWeekStart;
      } else {
        return maxPrevDate;
      }
    });

    // const middleDate = new Date(currentWeekStartDay.getFullYear(), currentWeekStartDay.getMonth(), currentWeekStartDay.getDate() - 1);
    //console.log(middleDate.getDate());
  };

  const handleNextWeek = () => {
    setCurrentWeekStartDay((prevWeekStartDay) => {
      const newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() + 4);
      const nextWeekEnd = new Date(newWeekStart.getFullYear(), newWeekStart.getMonth(), newWeekStart.getDate() + 6);
      const maxNextDate = new Date(thirtyDaysLater.getFullYear(), thirtyDaysLater.getMonth(), thirtyDaysLater.getDate() - 6);
      if (nextWeekEnd <= thirtyDaysLater) {
        return newWeekStart;
      } else if (prevWeekStartDay <= thirtyDaysLater) {
        return maxNextDate;
      } else {
        return prevWeekStartDay;
      }
    });

    const middleDate = new Date(currentWeekStartDay.getFullYear(), currentWeekStartDay.getMonth(), currentWeekStartDay.getDate() + 4);
    console.log(middleDate.getDate());
  };

  // ...código posterior...


  const renderCalendar = () => {
    const calendar = [];
    const startDate = new Date(currentWeekStartDay);
    const middleDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 3);
    const thirtyDaysLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 30);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
      const day = date.getDate();
      const dayName = daysOfWeek[date.getDay()].slice(0, 3);
      const isCurrentDay = date.toDateString() === currentDate.toDateString();
      const isMiddleDay = date.toDateString() === middleDate.toDateString();
      const isSelectable = date >= currentDate && date <= thirtyDaysLater;

      const dayClassNames = `py-2 px-4 mx-2 flex flex-col items-center gap-3 rounded-lg w-[63px] h-[76px] ${isCurrentDay ? 'border border-[#1e1e1e]' : ''
        } ${isCurrentDay && isMiddleDay ? 'bg-[#1e1e1e] text-white' : isMiddleDay ? 'bg-[#1e1e1e] text-white' : ''
        } ${!isSelectable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

      calendar.push(
        <div
          key={i}
          className={dayClassNames}
          onClick={() => isSelectable && handleDayClick(date)}
        >
          <div>{day}</div>
          <div>{dayName}</div>
        </div>
      );
    }

    return calendar;
  };

  generarDocumentoPorCadaDiaDisponible()




  /*  consultar ´por los turnos disponibles segun el dia de hoy o la fecha seleccionada  */

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'horarios', fechaFormateada), (doc) => {
      setTurnos(doc.data()?.horariosLaborales ?? []);
      console.log(turnos)
    });

    return () => unsubscribe()
  }, [selectedDay])

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-8'>
      <h2 className="text-xl font-bold">{selectedMonth} 2023</h2>
      <div className="flex items-center justify-center">
        <button className="text-xl" onClick={handlePrevWeek}><ion-icon name="arrow-back"></ion-icon></button>
        <div className="flex">{renderCalendar()}</div>
        <button className="text-xl" onClick={handleNextWeek}><ion-icon name="arrow-forward"></ion-icon></button>
      </div>

      <h2 className='font-semibold text-xl text-stone-800'>Turnos del dia {fechaFormateada}</h2>
      <div className='flex '>
        <div className='w-[20%] flex flex-col'>
          <button
            onClick={() => setPeriodoTurno('mañana')}
            className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoTurno === 'mañana' ? 'font-semibold border-l-[5px] border-black' : 'font-light'}`}>
            Mañana
          </button>
          <button
            onClick={() => setPeriodoTurno('tarde')}
            className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoTurno === 'tarde' ? 'font-semibold border-l-[5px] border-black' : 'font-light'}`}>
            Tarde
          </button>
        </div>
        <div className='w-[80%] grid grid-cols-3 gap-y-5 gap-x-10'>
          {
            filtrarTurnosPorPeriodo?.map((turno, i) =>
              <div key={i} className={`
                h-[45px] w-[177px] flex justify-between items-center gap-3 px-2 py-3 border border-l-[5px]
                ${!turno.disponible ? 'text-gray-400 border-gray-400' : 'border-black text-black'}
                border border-l-[5px] border-black
                `}>
                <p className='text-sm font-normal'>{turno.hora}</p>
                <p></p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};



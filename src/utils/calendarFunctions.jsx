export function shouldDisableDate(date) {
  const day = date.day();
  return day === 0 || day === 1 || day === 2 || day === 3
}

export function maxDate3(days) {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() + days)
  return fecha
}

// Ciclo for que recorre el arreglo de horas y  devuelve las que estan disponibles
export function obtenerHorasDisponibles(array) {
  let objetosDisponibles = [];

  if(array && array.length){
    for (let i = 0; i < array.length; i++) {
      if (array[i].disponible === true) {
        objetosDisponibles.push(array[i].hora)
      }
    }
  }
  return objetosDisponibles
}

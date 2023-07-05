import { useState, useEffect } from 'react';
import Switch from 'react-switch';

export default function Horario({ horario, horariosModificados, setHorariosModificados }) {
  const [isActive, setIsActive] = useState(horario.disponible);
  useEffect(() => {
    setIsActive(horario.disponible);
  }, [horario]);

  const isHorarioModificado = horariosModificados?.some((horarioModificado) => horarioModificado.id === horario.id) ;

  const handleToggle = () => {
    setIsActive(!isActive);

    if (isHorarioModificado) {
      setHorariosModificados((prevHorariosModificados) =>
        prevHorariosModificados.filter((horarioModificado) => horarioModificado.id !== horario.id)
      );
      console.log('Eliminando Elemento del arreglo')
    } else {
      setHorariosModificados((prevHorariosModificados) => [
        ...prevHorariosModificados,
        { id: horario.id, disponible: !horario.disponible },
      ]);
      console.log('Agregando Elemento al arreglo')

    }
  };

  return (
    <div  className={`
    h-[45px] w-[158px] flex justify-between items-center gap-3 px-2 py-3 
    border border-l-[5px] border-black
`}>
      <p className="text-sm font-normal">{horario.hora}</p>
      <Switch
        onChange={handleToggle}
        checked={isActive }
        onColor="#CCCCCC"
        offColor="#CCCCCC"
        handleDiameter={20}
        uncheckedIcon={false}
        checkedIcon={false}
        onHandleColor="#000"
        offHandleColor="#837e7e"
      />
    </div>
  );
}

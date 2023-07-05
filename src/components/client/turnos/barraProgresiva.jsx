import { useState } from 'react'



export default function BarraProgresiva({ step }) {

  const [progress, setProgress] = useState(0);
  const handleClick = () => {
    if (progress < 100) {
      setProgress(progress + 25);
    }
  };

  const barraSteps = [
    'Datos personales',
    'Servicio',
    'Profesional',
    'Dia Y Horario',
  ]

  const pasosNombres = () =>{
    if(step === 0){
      return 'Datos personales'
    }else if (step === 1){
      return 'Selecciona el servicio'
    }else if (step === 2){
      return 'Selecciona el profesional'
    }else if (step === 3){
      return 'Selecciona dia y hora'
    }
  }

  return (
    <article className='flex  justify-center w-full '>
     <div className='w-full'>
      <p className='text-[#2D2D2D] font-semibold text-lg'>Paso {step + 1} de 4 : <span className='font-medium'>{pasosNombres()}</span></p>
       <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
         {barraSteps.map((barStep, i) => (
           <div
             key={i}
             className="h-full transition-width duration-500"
             style={{
               width: `${((step - 1) >= i ? (step - 1) + 1 : step) * 25 + 25}%`,
               backgroundColor: step  >= i ? '#1C1B1F' : '#D9D9D9',
             }}
           ></div>
         ))}
       </div>
     </div>



    </article>
  )
}

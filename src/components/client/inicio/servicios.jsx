import { useEffect, useState } from 'react'
import { db } from '../../../utils/firebaseconfig'
import { doc, getDoc } from 'firebase/firestore'


export default function Servicios() {

    const [servicios, setServicios] = useState([])
    console.log('servicios page')

    const consultarServicios = async () => {
        try{
            
            const docRef = doc(db, 'utilidades', 'servicios')
            const serviciosDoc = await getDoc(docRef)
            setServicios(serviciosDoc.data().servicio)
            console.log('servicios consultados correctamente')
            console.log(servicios)
        } catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
       consultarServicios()
    }, [])
    const servicios2 = [
        {
          img: "https://i.ibb.co/Xpyqq0F/corte.png",
          nombre: "Corte",
          precio: "1200"
        },
        {
    
          img: "https://i.ibb.co/7rhPhF6/rasuradora1.webp",
          nombre: "Corte con rasuradora",
          precio: "1300"
        },
        {
    
          img: "https://i.ibb.co/9V7nYNs/corteybarba1.jpg",
          nombre: "Corte y barba",
          precio: "1500"
        },
    
        {
          img: "https://i.ibb.co/MfTsL05/barba1.jpg",
          nombre: "Barba",
          precio: "600"
        }
      ]

    return (
        <section id='servicios' className='h-auto '>
            <article className='flex flex-col items-center my-5 py-10 gap-y-5 '>
                <h2 className='font-bold text-[32px] text-center'>Servicios </h2>
                <p className='font-light text-sm text-center lg:w-[80%] lg:mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit rem fugiat earum ducimus aperiam, ea dolorum, natus, autem qui mollitia iure unde deserunt!
                </p>
            </article>
            <article className='grid md:grid-cols-2 w-[90%] lg:w-[80%] xl:w-[70%] place-items-center mx-auto gap-y-3'>
                {
                 servicios.map(servicio =>
                            <div
                                key={servicio.nombre}
                                className='relative w-[328px] h-[320px] xl:w-[503px] lg:h-[320px]'
                            >

                                <img
                                    src={servicio.img}
                                    className='w-[328px] h-[320px] xl:w-[31rem] lg:h-[20rem] object-cover rounded-2xl'
                                    alt={`imagen del servicio ${servicio.nombre}`} />

                                  <div className=' flex flex-col justify-end p-5
                                    w-full h-[100px] bg-gradient-to-t from-black to-transparent absolute bottom-0 text-white 
                                    font-semibold  rounded-b-2xl'>
                                    <p className='font-bold text-2xl text-[#D9D9D9]'>{servicio.nombre}</p>
                                </div>  
                            </div>
                        )
                     
                }
                
            </article>
        </section>
    )
}

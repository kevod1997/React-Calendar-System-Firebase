import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'

export default function Contacto() {

  const { user } = useAuth()
  return (
    <section className=' '>
      <article className='md:min-h-[95vh] md:flex flex-col justify-center items-center relative'>
        <div className='
            w-[328px] md:w-[720px] lg:w-[970px] xl:w-[1244px]  mx-auto bg-[#676B6C] 
            px-2 pb-10 pt-60  md:p-9 xl:py-14 xl:px-16
            rounded-3xl flex flex-col md:flex-row items-center
           '>
          <img
            src="https://i.ibb.co/SVcNwqN/corte-De-Un-Facherardo.jpg"
            alt="imagen corte de pelo"
            className='
            w-[296px] h-[320px] lg:w-[340px] lg:h-[399px] xl:w-[397px] xl:h-[457px] object-cover rounded-2xl absolute 
            -top-40 md:-top-16 xl:top-10 md:right-12 lg:right-10 xl:right-44 mx-auto'
          />
          <div  className='flex flex-col justify-center items-center gap-y-6 lg:gap-y-10 text-center max-w-sm lg:max-w-xl'>
            <h2 className='font-bold text-2xl lg:text-5xl text-white '>
              ¿Te interesa alguno de nuestros servicios?
            </h2>  
            <p className='font-light text-sm text-white md:w-[90%]'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
            <Link
              to={user ? '/nuevoturno' : '/micuenta'}
              className='w-[296px] h-[55px] flex justify-center items-center p-[10px] bg-black font-medium text-lg lg:text-base text-white'
            >
              Reservar turno
            </Link>
          </div>
        </div>
      </article>

     <article id='contacto' className='pt-10 h-auto max-h-full' >
        <div  className='flex flex-col gap-y-5 items-center px-10'>
          <h2 className='text-center font-bold text-[32px]'>Contacto</h2>
          <p className='font-light text-base text-center'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
          <div className='flex flex-col gap-y-5 items-center '>

            <h3  className='font-bold text-2xl py-4'>Encontranos en</h3>

            <div className='flex flex-col md:flex-row md:gap-x-10 lg:gap-x-20 xl:gap-x-40 gap-y-3 md:mb-5'>
              <div className='text-xl font-light flex items-center gap-x-2'>
                <ion-icon name="location"></ion-icon>
                <p className='text-base'> Direccion del local</p>
              </div>
              <div className='text-xl font-light flex items-center gap-2'>
                <ion-icon name="logo-instagram"></ion-icon>
                <p className='text-base'>instagram</p>
              </div>
              <div className='text-xl font-light flex items-center gap-x-2'>
                <ion-icon name="logo-facebook"></ion-icon>
                <p className='text-base'>facebook</p>
              </div>
              <div className='text-xl font-light flex items-center gap-x-2'>
                <ion-icon name="logo-whatsapp"></ion-icon>
                <p className='text-base'>whatsapp</p>
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5289.459298339436!2d-57.55375997221372!3d-37.97406465536815!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dbe0f154f8ff%3A0xbb48a827aae21b59!2sBlas%20Parera%20419%2C%20B7600BSI%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1687025714631!5m2!1sen!2sar"
              className='w-[3w0px] h-[480px] sm:w-[500px]  md:w-[650px] lg:w-[900px] xl:w-[1240px]'
              allowfullscreen="" loading="lazy"
              eferrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </article>

    </section>
  )
}

import React, { useRef, useState } from "react";
import Navbar from '../../components/layout/navbar'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { cortesDePelo } from "../../utils/helpers";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import SobreNosotros from "../../components/client/inicio/sobreNosotros";
import Servicios from "../../components/client/inicio/servicios";
import Equipo from "../../components/client/inicio/equipo";
import Testimonios from "../../components/client/inicio/testimonios";
import Contacto from "../../components/client/inicio/contacto";
import Footer from "../../components/layout/footer";
export default function Inicio() {


  return (
   <>
   <Navbar/>
     <main className="z-50 ">
       <section id="inicio" className="inicio h-screen bg-inicio bg-cover bg-center">
         <article className="w-full h-full bg-gradient-to-b from-black/80 to-black/50  pt-[72px]">
           <div className="flex flex-col justify-center items-center gap-y-8 pt-20">
             <h1 className="font-bold text-[64px] leading-[78px] text-center text-white">Tu estilo, nuestra <br />
               <span className="text-[96px] leading-[117px]">Pasión</span>
             </h1>
             <p className="w-[328px] md:w-[550px] lg:w-[846px] h-[52px] mx-auto font-light text-white text-base text-center ">¡Bienvenido a nuestra barbería, donde el estilo y la elegancia se unen en un solo lugar!</p>
             <Link
               to='/nuevoturno'
               className="
                     w-[327px] h-[55px] flex justify-center items-center mt-10
                     py-[10px] px-4 bg-black text-[#FDFFFC] text-base text-center font-semibold uppercase 
                     transition-all duration-300"
             >
               ¡Quiero reservar un turno!
             </Link>
           </div>
         </article>
         
       </section>
     
       <SobreNosotros/>
      <Servicios/>
      <Equipo/>
      <Testimonios/>
      <Contacto/>
      <Footer/>
     </main>
   </>
  );
}



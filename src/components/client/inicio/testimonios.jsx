import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';

export default function Testimonios() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        autoplay: true,
        autoplaySpeed: 2000

    };
    return (
       <section id='testimonios' className='pt-20 min-h-screen mx-auto  '>
         <article   className=' bg-[#D9D9D9] h-auto p-9 md:px-16  relative'>
             <h2 className='font-semibold text-[25px] sm:text-[32px] md:text-5xl text-center py-5'>¿Qué dicen nuestros <br /> clientes?</h2>
             <div className='flex md:pl-44 xl:pl-72 justify-start absolute top-36 md:top-60 md:left-24'>
                 <FormatQuoteRoundedIcon />
             </div>
             <Slider {...settings}>
                 <div className='py-8 md:px-5'>
                     <p className='text-center p-2 md:p-12 md:w-[60%] mx-auto'>"¡La barbería superó mis expectativas! Excelente atención, ambiente agradable y un corte de cabello impecable. ¡Volveré sin duda!"</p>
                     <p className='text-center font-semibold text-lg pt-8'>Luis Torres</p>
                 </div>
        
                 <div className='py-8'>
                     <p className='text-center p-2 md:p-12 md:w-[60%] mx-auto'>"Increíble experiencia en la barbería. El personal es amable y profesional. Me encantó mi nuevo peinado. Recomendado al 100%."</p>
                     <p className='text-center font-semibold text-lg pt-8'>Alejandro Ramos</p>
                 </div>
        
                 <div className='py-8'>
                     <p className='text-center p-2 md:p-12 md:w-[60%] mx-auto'>"La barbería es mi lugar favorito para arreglar mi barba. Siempre salgo con un aspecto impecable y me siento renovado. ¡Un servicio excepcional!"</p>
                     <p className='text-center font-semibold text-lg pt-8'>Javier Mendoza</p>
                 </div>
             </Slider>
             <div className='flex md:pr-44 xl:pr-72 justify-end absolute right-2 bottom-24 md:bottom-48 md:right-24'>
                 <FormatQuoteRoundedIcon />
             </div>
         </article>
       </section>
    )
}

const CustomPrevArrow = (props) => {
    const { className, onClick, style } = props;

    return (
        <div className='h-full z-10 flex-col content-center justify-end relative hidden md:flex'>

            <img
                onClick={onClick}
                className='cursor-pointer w-[30px] absolute top-[86px]'
                src="https://i.ibb.co/yVbp3vh/arrow-circle-left.png" alt=""

            />
        </div>
    );
};

// Componente de flecha de navegación personalizada para ir hacia adelante
const CustomNextArrow = (props) => {
    const { className, onClick, style } = props;

    return (
        <div className='h-full z-10 hidden md:flex flex-col content-center justify-end relative'>

            <img
                onClick={onClick}
                className='cursor-pointer w-[30px] absolute bottom-[227px] lg:bottom-[177px] xl:bottom-[154px] right-0'
                src="https://i.ibb.co/ZNfcQjP/arrow-circle-right.png" alt=''
            />
        </div>
    );
};


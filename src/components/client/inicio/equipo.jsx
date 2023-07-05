import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper";


export default function Equipo() {

    const profesionales = [
        {
            nombre:'Agustin',
            img:'https://i.ibb.co/QJVNxWJ/116458ad3a32cb261cd88428a17058f6.jpg',
            instragram:'',
            facebook:'',
        },
        {
            nombre:'Tomas',
            img:'https://i.ibb.co/2KTNbB5/6c6236144da2821d79b0559a448bcb5e.jpg',
            instragram:'',
            facebook:'',
        },
        {
            nombre:'Lean',
            img:'https://i.ibb.co/xDkCZwm/barbero.jpg',
            instragram:'',
            facebook:'',
        }
    ]

    return (
        <section id='team' className='w-[90%]  h-auto max-w-full max-h-full mx-auto overflow-hidden pt-20 md:mb-16 md:pt-3 relative'>
            <h2 className='font-bold text-[32px] text-center lg:pt-24 pb-5'>Nuestro equipo</h2>
            <p className='font-light text-sm text-center lg:w-[80%] lg:mx-auto md:mb-10'>Lorem ipsum arum ducitus, autem qui mollitia iure unde deserunts!
            </p>

            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                //   pagination={{
                //     clickable: true,
                //   }}
                 // navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                }}
                className="mySwiper flex justify-center"
            >

                {profesionales.map((profesional, index) => (
                    <SwiperSlide
                        key={index}

                    >
                        <div className={`
                                flex flex-col items-center justify-center  rounded-[100px]  mx-auto my-2 `
                        }>
                            <img
                                className={`
                                rounded-[50px] max-h-[327px]   object-top mx-auto
                               
                                    `}
                                src={profesional.img}
                                alt={`Imagen ${index + 1}`}
                            />
                            <div className='my-5 flex flex-col items-center gap-y-3'>
                                <p className='font-bold text-2xl'>{profesional.nombre}</p>
                                <p className='text-base font-light'>barbero</p>
                                <div className='flex gap-x-2 items-center'>
                                    <a href=""><img src="https://i.ibb.co/2ZwSywZ/Vector-3.png" alt="instagram del profesional" /></a>
                                    <a href="" className='text-3xl pt-[6px]'><ion-icon name="logo-facebook"></ion-icon></a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    )
}

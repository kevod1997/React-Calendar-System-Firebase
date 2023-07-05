import { doc, onSnapshot, getDoc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../../utils/firebaseconfig'
import ModalServicios from '../../components/admin/modalServicios'
import Alerta from '../../components/utils/alerta'
import DashBoard from '../../components/admin/dashBoard'
import ModalEditarServicio from '../../components/admin/modalEditarServicio'
import { toast } from 'react-toastify'
import PantallaCargando from '../../components/utils/pantallaCargando'

export default function ServiciosAdmin() {

    const [servicios, setServicios] = useState([])
    const [servicioAEditar, setServicioAEditar] = useState({})
    const [ modal, setModal ] = useState(false)
    const [ modalEliminar, setModalEliminar ] = useState(null)

    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        const consultarServicios = () => {
            const docRef = doc(db, 'utilidades', 'servicios')
            const unsubscribe = onSnapshot(docRef, (snapshot) => {
                setServicios(snapshot.data().servicio)
            })

            return () => {
                unsubscribe()
            }
        }

        consultarServicios()
    }, [])
    const eliminarServicio = async nombre => {
        try {
            setIsLoading(true)     
            const docRef = doc(db, 'utilidades', 'servicios')
            const docServicios = await getDoc(docRef)
            const dataServicios = docServicios.data().servicio
            const serviciosActualizados = dataServicios.filter(serv => serv.nombre !== nombre)
            await updateDoc(docRef, {
                servicio: serviciosActualizados
            })
            setModalEliminar(null)
            setIsLoading(false)     
            toast.success('¡Servicio eliminado correctamente!')
        } catch (error) {
            setIsLoading(false)     
            toast.error("Ups, algo salio mal.", "error")
        }
    }


    const handleModal = () =>{
        setModal(!modal)
    }
    return (
        <>
        <DashBoard/>
            <main className='lg:ml-[250px]'>
                { isLoading && <PantallaCargando isLoading={isLoading}/> }
                {modal && <ModalServicios handleModal={handleModal} setIsLoading={setIsLoading}/>}
                {Object.keys(servicioAEditar).length !== 0 && <ModalEditarServicio servicioAEditar={servicioAEditar} setServicioAEditar={setServicioAEditar} setIsLoading={setIsLoading}/>}
                {modalEliminar !== null && 
                <Alerta
                    titulo='Eliminar Servicio'
                    texto={(
                        <p>
                          ¿Estás seguro de eliminar al profesional
                          <span className="font-bold"> {''} {modalEliminar} {''} </span>
                          del sistema? Una vez realizada esta acción, no podrá revertirse.
                        </p>
                      )}
                    txtBtnCancelar='No, conservar'
                    txtBtnConfirmar='Si, eliminar'
                    confirmar={() => eliminarServicio(modalEliminar)}
                    cancelar={() => setModalEliminar(null)}
                />}
                <section className='flex justify-start p-10 text-[#1e1e1e]'>
                    <article className='flex flex-col gap-y-5'>
                        <h2 className='text-2xl font-semibold'>servicios</h2>
                        <p className='text-base font-light '>En este panel tienes la posibilidad de administrar los servicios de tu negocio. ¡Puedes agregar nuevos, editar los que ya tienes o eliminarlos!</p>
                        <div className='flex justify-end'>
                            <button
                                onClick={handleModal}
                                className='w-[209px] h-[48px] p-3 flex justify-center items-center bg-[#1e1e1e] text-white font-medium text-base '
                            >
                                <ion-icon name="add"></ion-icon>
                                Nuevo servicio
                            </button>
                        </div>
                    </article>
                </section>
                <section>
                    <article className='w-full grid grid-cols-4 place-items-start px-2 sm:px-10 sm:text-base text-sm'>
                        <p className='font-normal '>Foto</p>
                        <p className='font-normal '>Descripcion</p>
                        <p className='font-normal '>Precio</p>
                        <p className='font-normal '>Acciones</p>
                    </article>
                    <article>
                        {servicios?.length !== 0 ? (
                            servicios.map((servicio, index) => (
                                <div
                                    key={servicio.id}
                                    className={`grid grid-cols-4 place-items-start items-center py-[11px] px-2 sm:px-10 text-[#2d2d2d] ${index % 2 === 0 ? 'bg-white' : 'bg-[#2d2d2d]/10'
                                        }`}
                                >
                                    {
                                        servicio.img !== ''
                                            ? <img src={servicio.img} className='w-[42px] h-12 object-cover rounded-lg' alt={`Imagen del prfesional ${servicio.nombre}`} />
                                            : <div className='bg-[#c4c7c7] w-[42px] h-12 rounded-lg flex flex-col items-center justify-center'>
                                                <img
                                                    className='w-[10px] h-[10px]'
                                                    src="https://i.ibb.co/YthSfQx/Vector.png"
                                                    alt="icono imagen"
                                                />
                                            </div>
                                    }
                                    <p className='font-normal text-sm'>{servicio.nombre}</p>
                                    <p className='font-normal text-sm'>$ {servicio.precio}</p>
                                   <div className='flex justify-between gap-x-8 '>
                                    <button onClick={() => setModalEliminar(servicio.nombre)}>
                                         <img src="https://i.ibb.co/VC2sk8c/delete-2.png" alt="icono eliminar" />
                                    </button>
                                    <button onClick={() => { 
                                        setServicioAEditar(servicio)
                                    }}>
                                         <img src="https://i.ibb.co/7gbLxGS/edit.png" alt="icono editar" />
                                    </button>
                                   </div>
                                </div>
                            ))
                        ) : (
                            <p>No has agregado servicios aún</p>
                        )}
                    </article>
                </section>
            </main>
        </>
    )
}

import { useState, useEffect } from 'react'
import ModalProfesionales from '../../components/admin/modalProfesionales'
import Alerta from '../../components/utils/alerta'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import DashBoard from '../../components/admin/dashBoard'

export default function ProfesionalesAdmin() {

    const [profesionales, setProfesionales] = useState([])
    const [profesionalAEditar, setProfesionalAEditar] = useState({})
    const [ modal, setModal ] = useState(false)
    const [ modalEliminar, setModalEliminar ] = useState(null)

    useEffect(() => {
        const consultarTurnos = () => {
            const docRef = doc(db, 'utilidades', 'profesionales')
            const unsubscribe = onSnapshot(docRef, (snapshot) => {
                setProfesionales(snapshot.data().profesionales)
            })

            return () => {
                unsubscribe()
            }
        }

        consultarTurnos()
    }, [])

    const eliminarProfesional = async nombre => {
        const docRef = doc(db, 'utilidades', 'profesionales')
        const docProfesionales = await getDoc(docRef)
        const dataProfesionales = docProfesionales.data().profesionales
        const profesionalesActualizados = dataProfesionales.filter(prof => prof.nombre !== nombre)
        await updateDoc(docRef, {
            profesionales: profesionalesActualizados
        })
        setModalEliminar(null)
    }


    const handleModal = () =>{
        setModal(!modal)
    }
    return (
       <>
       <DashBoard/>
         <main className='lg:ml-[250px]'>
             {modal && <ModalProfesionales profesional={profesionalAEditar} setProfesionalAEditar={setProfesionalAEditar} handleModal={handleModal}/>}
             {modalEliminar !== null && 
             <Alerta
                 titulo='Eliminar Profesional'
                 texto={(
                     <p>
                       ¿Estás seguro de eliminar al profesional
                       <span className="font-bold"> {''} {modalEliminar} {''} </span>
                       del sistema? Una vez realizada esta acción, no podrá revertirse.
                     </p>
                   )}
                 txtBtnCancelar='No, conservar'
                 txtBtnConfirmar='Si, eliminar'
                 confirmar={() => eliminarProfesional(modalEliminar)}
                 cancelar={() => setModalEliminar(null)}
             />}
             <section className='flex justify-start p-10 text-[#1e1e1e]'>
                 <article className='flex flex-col gap-y-5'>
                     <h2 className='text-2xl font-semibold'>Profesionales</h2>
                     <p className='text-base font-light '>En este panel tienes la posibilidad de administrar los profesionales de tu negocio. ¡Puedes agregar nuevos, editar los que ya tienes o eliminarlos!</p>
                     <div className='flex justify-end'>
                         <button
                             onClick={handleModal}
                             className='w-[209px] h-[48px] p-3 flex justify-center items-center bg-[#1e1e1e] text-white font-medium text-base '
                         >
                             <ion-icon name="add"></ion-icon>
                             Nuevo profesional
                         </button>
                     </div>
                 </article>
             </section>
             <section>
                 <article className='w-full grid grid-cols-4 place-items-start px-2 sm:px-10'>
                     <p className='font-normal text-base'>Foto</p>
                     <p className='font-normal text-base'>Nombre</p>
                     <p className='font-normal text-base'>Profesion</p>
                     <p className='font-normal text-base'>Acciones</p>
                 </article>
                 <article>
                     {profesionales.length !== 0 ? (
                         profesionales.map((profesional, index) => (
                             <div
                                 key={profesional.id}
                                 className={`grid grid-cols-4 place-items-start items-center py-[11px] px-2 sm:px-10 text-[#2d2d2d] ${index % 2 === 0 ? 'bg-white' : 'bg-[#2d2d2d]/10'
                                     }`}
                             >
                                 {
                                     profesional.img !== ''
                                         ? <img src={profesional.img} className='w-[42px] h-12 object-cover rounded-lg' alt={`Imagen del prfesional ${profesional.nombre}`} />
                                         : <div className='bg-[#c4c7c7] w-[42px] h-12 rounded-lg flex flex-col items-center justify-center'>
                                             <img
                                                 className='w-[10px] h-[10px]'
                                                 src="https://i.ibb.co/YthSfQx/Vector.png"
                                                 alt="icono imagen"
                                             />
                                         </div>
                                 }
                                 <p className='font-normal text-sm'>{profesional.nombre}</p>
                                 <p className='font-normal text-sm'>{profesional.profesion}</p>
                                <div className='flex justify-between gap-x-8 '>
                                 <button onClick={ () => setModalEliminar(profesional.nombre) }>
                                      <img src="https://i.ibb.co/VC2sk8c/delete-2.png" alt="icono eliminar" />
                                 </button>
                                 <button onClick={() => {
                                     setProfesionalAEditar(profesional)
                                     handleModal()
                                 }}>
                                      <img src="https://i.ibb.co/7gbLxGS/edit.png" alt="icono editar" />
                                 </button>
                                </div>
                             </div>
                         ))
                     ) : (
                         <p>No has agregado profesionales aún</p>
                     )}
                 </article>
             </section>
         </main>
       </>
    )
}


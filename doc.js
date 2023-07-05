//  useEffect(() => {
//   //   async function obtenerDocumento() {
//   //     const docRef = doc(db, 'horarios', value)
//   //     const docSnap = await getDoc(docRef)
//   //     const nuevaConsulta = docSnap.data().horariosLaborales
//   //     setHorarios(nuevaConsulta)
//   //   }
//   //   obtenerDocumento()
//  }, [])




/// calendar


 // useEffect(() => {
  //   const fechaFormateada = selectedDate.format('DD-MM');
  //   const obtenerHorariosDelDiaSeleccionado = async () => {
  //     setLoading(true)
  //     const docref = doc(db, 'horarios', fechaFormateada)
  //     const documentoSeleccionado = await getDoc(docref)
  //     const horariosConsultados = documentoSeleccionado.data().horariosLaborales
  //     //console.log(turnosConsultados)
  //     setHorarios(horariosConsultados)
  //     setLoading(false)
  //   }
  //   obtenerHorariosDelDiaSeleccionado()
  // }, [selectedDate])

  // useEffect(() => {
  //   setLoading(true)
  //   const unsub = onSnapshot(doc(db, "horarios", fecha), (doc) => {
  //     const newData = doc.data().horariosLaborales
  //     setHorarios(newData)
  //   });
  //   setLoading(false)
  //   return () => {
  //     unsub();
  //   };
  // }, [])




// useEffect(() => {
    //     const unsub = onSnapshot(doc(db, "horarios", value), (doc) => {
    //         const newData =  doc.data().horariosLaborales
    //         setHorarios(newData)
    //       });

    //     return () => {
    //         unsub();
    //     };
    // }, [selectedDate])
    // useEffect(() => {
    //     async function obtenerDocumento() {
    //         setLoading(true)
    //         const docRef = doc(db, 'horarios', value)
    //         const docSnap = await getDoc(docRef)
    //         if(docSnap.exists()){
    //             const nuevaConsulta = docSnap.data().horariosLaborales
    //             setHorarios(nuevaConsulta)
    //             setLoading(false)
    //         }
    //         setLoading(false)
    //         diasNolaborales.push('No hay turnos disponibles para hoy')
    //         console.log(diasNolaborales)
    //     }
    //     obtenerDocumento()
    // }, [selectedDate])
import { auth, db } from "../utils/firebaseconfig";
import { createContext, useContext, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider
} from "firebase/auth";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) {
    console.log('error creando al crear contexto')
  }
  return context
}

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState('')
  const [datosUsuarioActual, setDatosUsuarioActual] = useState({})
  
  // estado para el nombre completo en el registro comun de firebase
  const [fullName, setFullName] = useState('')
  
  // Estado para la pantalla de carga
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  
  //Local Storage
  useEffect(() => {
    // Guardar user en el localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Guardar datosUsuarioActual en el localStorage
    localStorage.setItem('datosUsuarioActual', JSON.stringify(datosUsuarioActual));
  }, [user, datosUsuarioActual]);

  useEffect(() => {
    // Obtener user del localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Obtener datosUsuarioActual del localStorage
    const storedDatosUsuarioActual = localStorage.getItem('datosUsuarioActual');
    if (storedDatosUsuarioActual) {
      setDatosUsuarioActual(JSON.parse(storedDatosUsuarioActual));
    }
  }, []);

  const crearDocumentoDeUsuario = async () => {
    if (user?.uid) {
      const docRef = doc(db, 'usuarios', user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          email: user.email,
          role: 'cliente',
          fullName: user.displayName !== null ? user.displayName : fullName,
          turnosActivos: [],
          img: ''
        });
        setTimeout(() => {
          traerDatosDeUsuarioActual()
        }, 2000);
        console.log('Cliente registrado en la base de datos correctamente');
      } else {
        console.log('Cliente ya registrado');
      }
    }
  };

  const traerDatosDeUsuarioActual = async () => {
    if (user && user.uid) {
      console.log(user.uid);
      const docRef = doc(db, 'usuarios', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDatosUsuarioActual(docSnap.data());
      } else {
        //setDatosUsuarioActual({});
        await crearDocumentoDeUsuario();
      }
    }
  };



  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log('No hay usuario suscrito');
        setUser('');
      } else {
        setUser(currentUser);
        console.log('Usuario logueado');
      }
      setIsLoadingAuth(false); // Indica que la autenticación se ha cargado completamente
    });
  
    return () => suscribed();
  }, []);

  useEffect(() => {
    if (user && user.uid) {
      traerDatosDeUsuarioActual();
      console.log('trayendo datos...')
    } else {
      console.log('No hay datos del usuario actual')
      setDatosUsuarioActual({})
    }
  }, [user]);



  const register = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = response.user;
      await traerDatosDeUsuarioActual();
      await crearDocumentoDeUsuario(newUser.uid);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Email ya registrado", "error")
      } else if (error.code === 'auth/invalid-email') {
        toast.error("Email invalido", "error")
      } else if (error.code === 'auth/weak-password') {
        toast.error("Contraseña demasiado corta, Usar minimo 6 caracteres", "error")
      } else if (error.code) {
        toast.error("Ups, algo salio mal", "error")
      }
      // Aquí puedes realizar acciones adicionales en caso de error, como mostrar un mensaje de error al usuario.
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/wrong-password') {
        toast.error("Contraseña incorrecta.", "error")
      } else if (error.code === 'auth/user-not-found') {
        toast.error("Usuario no encontrado.", "error")
      } else {
        toast.error("Ups, algo salio mal.", "error")
      }
      // Acciones adicionales en caso de error.
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const responseGoogle = new GoogleAuthProvider();
      return await signInWithPopup(auth, responseGoogle);
    } catch (error) {
      toast.error("Ups, algo salio mal.", "error")
      setIsLoading(false)

      // Acciones adicionales en caso de error.
    }
    setIsLoading(false);
  };

  const loginWithFacebook = async () => {
    setIsLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      setIsLoading(false);
      toast.error("Ups, algo salio mal.", "error")
      // Acciones adicionales en caso de error.
    }
  };

  const logOut = async () => {
    setIsLoading(true);
    try {
      setUser('')
      setDatosUsuarioActual({})
      const response = await signOut(auth);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Ups, algo salio mal.", "error")
      // Acciones adicionales en caso de error.
    }
  };

  return (
    <authContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        loginWithFacebook,
        logOut,
        user,
        datosUsuarioActual,
        setDatosUsuarioActual,
        traerDatosDeUsuarioActual,
        crearDocumentoDeUsuario,
        fullName,
        setFullName,

        isLoading,
        setIsLoading,
        isLoadingAuth
      }}
    >
      {children}
      <ToastContainer />
    </authContext.Provider>
  )
}
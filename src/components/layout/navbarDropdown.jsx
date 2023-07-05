import { useAuth } from '../../context/authContext'
import { useNavigate, Link } from 'react-router-dom';

export default function NavbarDropdown({ showDropdown, handleDropdownToggle }) {
    const auth = useAuth()
    const { datosUsuarioActual, logOut, setDatosUsuarioActual } = auth

    const navigate = useNavigate()

    return (
        <div className="relative ">
            <button onClick={handleDropdownToggle} className="link  py-2 rounded inline-flex items-center gap-x-1 " >
                <p className="link mr-1 inline-flex items-center">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    {datosUsuarioActual?.fullName?.split(' ')[0]}
                </p>

                <p className={`  duration-100 transition-transform ${showDropdown ? ' rotate-180' : ''}`} >
                    <ion-icon name="chevron-down-sharp"></ion-icon>
                </p>
            </button>
            <ul className={`${showDropdown ? "block ease-in " : "hidden ease-out"} transition-all duration-500 absolute  right-5 `}>
                <Link
                    to='/datos'
                    className="flex items-center gap-x-2  bg-gray-300 hover:bg-gray-400 p-2 w-48 link"
                >
                    <ion-icon name="person-outline"></ion-icon>
                    <p> Perfil</p>
                </Link>
                <Link to='/micuenta'
                    onClick={() => {
                        logOut()
                        //setDatosUsuarioActual({})
                    }}
                    className="flex items-center gap-x-2  bg-gray-300 hover:bg-gray-400 p-2 w-48 "
                >
                    <ion-icon name="log-out-outline"></ion-icon> Cerrar sesión
                </Link>


            </ul>
        </div>
    );
}



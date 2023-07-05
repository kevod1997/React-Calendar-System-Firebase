import { Outlet, Link, useLocation } from "react-router-dom";
import React from 'react';
import Navbar from "../../layout/navbar";

export default function SideBar() {
  const location = useLocation();

  return (
    <main>
      {
        location.pathname === '/turnos' || location.pathname === '/datos'

          // ? <section className="flex mt-20 fixed left-20 w-[20%]">
          ? <section className="flex mt-20 fixed left-20 w-[20%]">
              <div className="w-[20%] flex flex-col h-full justify-end">
                <Link
                  to="/datos"
                  className={`w-[120px] h-[44px] py-3 px-2 text-base ${location.pathname === '/datos'
                    ? 'font-semibold border-l-[5px] border-black'
                    : 'font-light'
                    }`}
                >
                  Datos
                </Link>
                <Link
                  to="/turnos"
                  className={`w-[120px] h-[44px] py-3 px-2 text-base ${location.pathname === '/turnos'
                    ? 'font-semibold border-l-[5px] border-black'
                    : 'font-light'
                    }`}
                >
                  Turnos
                </Link>
              </div>

            <Outlet />
            <div className="w-[80%]">{/* Agrega estilos CSS según tus necesidades */}</div>

            <div className="w-[80%]">
            </div>
          </section>
          : ''
      }
    </main>
  );
}

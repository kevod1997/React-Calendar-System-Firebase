import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { animateScroll as scroll, Link as LinkScroll, scroller } from 'react-scroll';

export default function NavbarLinks({ flexDirection }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navigate = useNavigate()
  const hadleLinkClick = (link, offset) => {
     if (!isHomePage) {
      navigate('/')
      setTimeout(() => {
        //handleClickScroll(link);
        scroller.scrollTo(link, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset:offset
        })
      }, 300);
  }
  }
  return (
    <ul
      className={`navegacion flex items-start lg:items-center gap-x-7 font-normal leading-5 text-[18px] z-10 ${flexDirection}`}
    >
        <li className="cursor-pointer">
          <LinkScroll
           onClick={() => hadleLinkClick('inicio', -80)}
            to="inicio"
            className="link"
            activeClass="activo"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Inicio
          </LinkScroll>
        </li>
    
      <div className="lg:hidden">
        <li className={`link ${location.pathname === '/turnos' ? 'activo' : ''}`}>
          <Link to="/turnos">Turnos</Link>
        </li>
      </div>

      <li className="cursor-pointer">
        <LinkScroll
          onClick={() => hadleLinkClick('nosotros', -80)}
          to="nosotros"
          activeClass="activo"
          className="link"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
        >
          Nosotros
        </LinkScroll>
      </li>

      <li className="cursor-pointer">
        <LinkScroll
          to="servicios"
          onClick={() => hadleLinkClick('servicios', -75)}
          activeClass="activo"
          className="link"
          spy={true}
          smooth={true}
          offset={-75}
          duration={500}
        >
          Servicios
        </LinkScroll>
      </li>

      <li className="cursor-pointer">
        <LinkScroll
          to="team"
          activeClass="activo"
         onClick={() => hadleLinkClick('team', 10)}
          className="link"
          spy={true}
          smooth={true}
          offset={10}
          duration={500}
        >
          Equipo
        </LinkScroll>
      </li>

      <li className="cursor-pointer">
        <LinkScroll
          to="testimonios"
          onClick={() => hadleLinkClick('testimonios', -50)}
          activeClass="activo"
          className="link"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
        >
          Testimonios
        </LinkScroll>
      </li>

      <li className="cursor-pointer">
        <LinkScroll
          to="contacto"
          onClick={() => hadleLinkClick('contacto', -50)}
          className="link"
          activeClass="activo"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
        >
          Contacto
        </LinkScroll>
      </li>
    </ul>
  );
}

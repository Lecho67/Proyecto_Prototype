import './BarraNavegacion.css'; // Importa el archivo de estilos CSS
import logo from '../../assets/Logo.png';
import botonHamburguesa from '../../assets/BotonHamburguesa.png';
import { useState } from 'react';

  export function Navigation() {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    };
    return (
      <>
        <div className="BarraNav">
          <nav className="BarraNav">
            <div className='logoContainer'><img className="logo" src={logo} alt=''></img></div>
            <ul className={`menuDesplegable ${menuVisible ? 'showMenu' : 'invisible'}`}>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Cartelera</a></li>
              <li><a href="#">Comidas</a></li>
              <li><a href="#">Próximos Estrenos</a></li>
              <li><a href="#">Mi Perfil</a></li>
              <li><a href="#">Mi Orden</a></li>
            </ul>
            <div className="linksContainer">  
              <div><a href="#">Inicio</a></div>
              <div><a href="#">Cartelera</a></div>
              <div><a href="#">Comidas</a></div>
              <div><a href="#">Estrenos</a></div>
              <div><a href="#">Mi Perfil</a></div>
              <div><a href="#">Mi Orden</a></div>
            </div>
            <img src={botonHamburguesa} alt="Botón de hamburguesa" className="toggleButton" />
          </nav>
        </div>
      </>
    );
  }
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
            <div className="linksContainer">  
              <div><a href="/">Inicio</a></div>
              <div><a href="/Comidas">Comidas</a></div>
              <div><a href="/Estrenos">Estrenos</a></div>
              <div><a href="/Perfil">Mi Perfil</a></div>
              <div><a href="/Perfil/Orden">Mi Orden</a></div>
            </div>
            <div className='buttonContainer'>
              <button className='btnHamburguesa' onClick={toggleMenu}><img src={botonHamburguesa} alt="Botón de hamburguesa" className="imgHamburgesa" /></button>
            </div>
            
          </nav>
        </div>
        <div className={`${menuVisible ? 'menuDesplegableVisible' : 'menuDesplegableInvisible'}`}>
            <a href="/"><div className='itemMenuDesplegable'>Inicio</div></a>
            <a href="/Comidas"><div className='itemMenuDesplegable'>Comidas</div></a>
            <a href="/Estrenos"><div className='itemMenuDesplegable'>Próximos Estrenos</div></a>
            <a href="/Perfil"><div className='itemMenuDesplegable'>Mi Perfil</div></a>
            <a href="/Perfil/Orden"><div className='itemMenuDesplegable'>Mi Orden</div></a>
        </div>
      </>
    );
  }
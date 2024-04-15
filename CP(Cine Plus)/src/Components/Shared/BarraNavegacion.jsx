import './BarraNavegacion.css'; // Importa el archivo de estilos CSS
export  function Navigation() {
    return (
    <>
    <div className="BarraNav">
      <nav className="BarraNav">
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Cartelera</a></li>
          <li><a href="#">Comidas</a></li>
          <li><a href="#">Próximos Estrenos</a></li>
          <li><a href="#">Mi Perfil</a></li>
        </ul>
      </nav>
    </div>
    </>
    );
  }
  
  // Componente de carrusel de películas
export  function Carousel() {
    return (
      <div className="carrusel">
        <h2>Carrusel de Películas</h2>
        <div className="slick-carousel">
          <div><img src="pelicula1.jpg" alt="Película 1" /></div>
          <div><img src="pelicula2.jpg" alt="Película 2" /></div>
          <div><img src="pelicula3.jpg" alt="Película 3" /></div>
          {/* Agrega más películas según sea necesario */}
        </div>
      </div>
    );
  }
  
  // Componente de fila de películas
export function MovieRow() {
    return (
      <div className="fila">
        {/* Películas de la fila */}
        <div className="pelicula"><img src="pelicula4.jpg" alt="Película 4" /></div>
        <div className="pelicula"><img src="pelicula5.jpg" alt="Película 5" /></div>
        <div className="pelicula"><img src="pelicula6.jpg" alt="Película 6" /></div>
        {/* Agrega más películas según sea necesario */}
      </div>
    );
  }

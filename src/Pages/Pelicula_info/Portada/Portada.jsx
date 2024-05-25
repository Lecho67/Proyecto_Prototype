import React from 'react';
import './Portada.css';

const Portada = ({ pelicula = {}}) => {
  // Aquí puedes usar los productos pasados como propiedades

  return (
    <div className='PortadaContainer'>
      <div className='PortadaBgContainer' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${pelicula.poster_path})`}}>
        <div className='PortadaImgContainer'>
          <img className='PortadaImg' src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} alt={pelicula.title} />  
        </div>
        <div className='PortadaTitleContainer'>
          <h1 className='PortadaTitle'>{pelicula.title}</h1>
        </div>
      </div>
    </div>
  );
}

export default Portada;

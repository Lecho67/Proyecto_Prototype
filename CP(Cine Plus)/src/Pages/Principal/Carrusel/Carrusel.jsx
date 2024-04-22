import React from 'react'
import './Carrusel.css'
import { useState, useEffect } from 'react'
import useFetchPeliculas from '../../../Hooks/useFetchPeliculas'

const Carrusel = ({numeroDePeliculas = 5, pageSize = 20}) => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const data = await useFetchPeliculas(numeroDePeliculas, pageSize);
        setPeliculas(data);
      }
      catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    }
    fetchPeliculas();
  }, [numeroDePeliculas]);  


  return (
    <>
      <div className='CarruselContainer'>
       {peliculas.map((pelicula) => (
        <div key={pelicula.id} className="CarruselMovie">
          <a className='aCarruselMovie' href={`Pelicula?id=${pelicula.id}`}>
            <img className='CarruselMovieImg'
              src={`https://image.tmdb.org/t/p/w300/${pelicula.poster_path}`}
              alt={pelicula.title}
            />
          </a>
        </div>
      ))} </div>
    </>
  )
}

export default Carrusel
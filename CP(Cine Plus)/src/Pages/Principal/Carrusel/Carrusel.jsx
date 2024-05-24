import React from 'react'
import './Carrusel.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useFetchPeliculas from '../../../Hooks/useFetchPeliculas'
import { Link } from 'react-router-dom'

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
          <Link className='aCarruselMovie' to={`Pelicula?id=${pelicula.id}`}>
            <img className='CarruselMovieImg'
              src={`https://image.tmdb.org/t/p/w300/${pelicula.poster_path}`}
              alt={pelicula.title}
            />
          </Link>
        </div>
      ))} </div>
    </>
  )
}

export default Carrusel
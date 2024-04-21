import React from 'react'
import './Carrusel.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Carrusel = () => {
  const [peliculas, setPeliculas] = useState([]);
  const numeroDePeliculas = 5; // Número de películas que deseas mostrar
  const pageSize = 20; // Tamaño de página de la API de TMDB

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const totalPages = Math.ceil(numeroDePeliculas / pageSize);
        const requests = [];

        for (let page = 1; page <= totalPages; page++) {
          requests.push(
            axios.get(
              'https://api.themoviedb.org/3/movie/now_playing',
              {
                params: {
                  api_key: '3b24534de9f3e0c2935e3edd6446ad0c',
                  language: 'es',
                  page: page,
                },
              }
            )
          );
        }

        const responses = await Promise.all(requests);
        const peliculasData = responses.flatMap(response => response.data.results);
        setPeliculas(peliculasData.slice(0, numeroDePeliculas));
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    };

    fetchPeliculas();
  }, [numeroDePeliculas]);
  return (
    <>
      <div className='CarruselContainer'>
       {peliculas.map((pelicula) => (
        <div key={pelicula.id} className="CarruselMovie">
          <a className='aCarruselMovie' href={`https://www.themoviedb.org/movie/${pelicula.id}`}>
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
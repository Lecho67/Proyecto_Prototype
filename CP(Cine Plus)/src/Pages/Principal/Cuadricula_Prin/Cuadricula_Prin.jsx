// src/Pages/Principal/Cuadricula_Prin/Cuadricula_Prin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cuadricula_Prin.css'; // Importar el archivo de estilos
import { useMovieContext } from '../../../context/movieContext';

const Cartelera = () => {
  const [peliculas, setPeliculas] = useState([]);
  const numeroDePeliculas = 30; // Número de películas que deseas mostrar
  const pageSize = 20; // Tamaño de página de la API de TMDB
  const { setMovieId } = useMovieContext();

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

  const handleMovieClick = (id) => {
    setMovieId(id);
  };

  return (
    <>
      <br />
      <h1 className='carteleraTitulo'>Cartelera</h1>
      <div className="container">
        <div className="grid">
          {peliculas.map((pelicula) => (
            <div key={pelicula.id} className="movie" onClick={() => handleMovieClick(pelicula.id)}>
              <a href={`/Pelicula?id=${pelicula.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${pelicula.poster_path}`}
                  alt={pelicula.title}
                />
              </a>
              <h2>{pelicula.title}</h2>
              <p>Clasificación: {pelicula.vote_average}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cartelera;

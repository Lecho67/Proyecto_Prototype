import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cuadricula_Prin.css'; // Importar el archivo de estilos

const Cartelera = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/now_playing',
          {
            params: {
              api_key: '3b24534de9f3e0c2935e3edd6446ad0c',
              language: 'es',
              page: 1,
            },
          }
        );
        setPeliculas(response.data.results);
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    };

    fetchPeliculas();
  }, []);

  return (
    <div className="container">
      <h1>Cartelera</h1>
      <div className="grid">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie">
            <img
              src={`https://image.tmdb.org/t/p/w300/${pelicula.poster_path}`}
              alt={pelicula.title}
            />
            <h2>{pelicula.title}</h2>
            <p>Clasificación: {pelicula.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cartelera;


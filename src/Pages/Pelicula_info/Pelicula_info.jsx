// src/Pages/Pelicula_info/Pelicula_info.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetchPelicula from '../../Hooks/useFetchPelicula';
import useFetchPeliculaCredits from '../../Hooks/useFetchPeliculaCredits';
import useFetchPeliculaTrailer from '../../Hooks/useFetchPeliculaTrailer';
import { useMovieContext } from '../../context/movieContext';
import Portada from './Portada/Portada';
import Descripcion from './Descripcion/Descripcion';

const Pelicula_info = ({ allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const { setMovieId } = useMovieContext();
  const [pelicula, setPelicula] = useState();
  const [credits, setCredits] = useState();
  const [videos, setVideos] = useState(); 

  useEffect(() => {
    setMovieId(id); // Establecer el ID de la película en el contexto
  }, [id, setMovieId]);

  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        const data = await useFetchPelicula(id);
        const dataCredits = await useFetchPeliculaCredits(id);
        const dataVideos = await useFetchPeliculaTrailer(id);
        setPelicula(data);
        setCredits(dataCredits);
        setVideos(dataVideos);
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    };
    fetchPelicula();
  }, [id]);
  

  return (
    <>
      <Portada pelicula={pelicula} allProducts={allProducts} />
      <Descripcion
        idPelicula={id}
        pelicula={pelicula}
        credits={credits}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
        videos={videos}
      />
    </>
  );
};

export default Pelicula_info;

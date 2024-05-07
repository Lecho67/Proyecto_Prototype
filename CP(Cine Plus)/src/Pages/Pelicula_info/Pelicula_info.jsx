import React, { useEffect, useState } from 'react'
import {Navigation} from '../../Components/Shared/BarraNavegacion/BarraNavegacion.jsx'
import Portada from './Portada/Portada.jsx'
import {useLocation} from 'react-router-dom'
import useFetchPelicula from '../../Hooks/useFetchPelicula'
import useFetchPeliculaCredits from '../../Hooks/useFetchPeliculaCredits'
import Descripcion from './Descripcion/Descripcion.jsx'

const Pelicula_info = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')
  const [pelicula, setPelicula] = useState()
  const [credits, setCredits] = useState()

  const fetchPelicula = async () => {
    try {
      const data = await useFetchPelicula(id);
      const dataCredits = await useFetchPeliculaCredits(id);
      setPelicula(data);
      setCredits(dataCredits);
      console.log(dataCredits);
    }
    catch (error) {
      console.error('Error al obtener las páliculas:', error);
    }
  }

  useEffect(() => {
    fetchPelicula();
  }, [])
  return (
    <>
      <Portada pelicula={pelicula}/>
      <Descripcion pelicula={pelicula} credits={credits}/>
    </>
  )
}

export default Pelicula_info
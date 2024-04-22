import React, { useEffect, useState } from 'react'
import {Navigation} from '../../Components/Shared/BarraNavegacion.jsx'
import Portada from './Portada/Portada.jsx'
import {useLocation} from 'react-router-dom'
import useFetchPelicula from '../../Hooks/useFetchPelicula'

const Pelicula_info = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')
  const [pelicula, setPelicula] = useState()

  const fetchPelicula = async () => {
    try {
      const data = await useFetchPelicula(id);
      setPelicula(data);
      console.log(pelicula);
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
      <Navigation/>
      <Portada titulo={pelicula?.title}/>
    </>
  )
}

export default Pelicula_info
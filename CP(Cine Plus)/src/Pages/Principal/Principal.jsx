// src/Pages/Principal/Principal.jsx
import React from 'react';
import Cartelera from '../Principal/Cuadricula_Prin/Cuadricula_Prin.jsx';
import Carrusel from './Carrusel/Carrusel.jsx';

function Principal() {
  return (
    <>
      <Carrusel />
      <Cartelera />
    </>
  );
}

export default Principal;

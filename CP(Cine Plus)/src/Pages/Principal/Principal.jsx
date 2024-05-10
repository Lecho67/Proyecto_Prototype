import { Navigation } from '../../Components/Shared/BarraNavegacion/BarraNavegacion.jsx'
import Cartelera from '../Principal/Cuadricula_Prin/Cuadricula_Prin.jsx'
import Carrusel from './Carrusel/Carrusel.jsx'

function Principal() {
  return (
    <>
      <Carrusel/>
      <Cartelera/>
    </>
  )
}

export default Principal
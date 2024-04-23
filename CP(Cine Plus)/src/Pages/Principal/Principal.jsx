import { Navigation } from '../../Components/Shared/BarraNavegacion.jsx'
import Cartelera from '../Principal/Cuadricula_Prin/Cuadricula_Prin.jsx'
import Carrusel from './Carrusel/Carrusel.jsx'

function Principal() {
  return (
    <>
      <Navigation />
      <Carrusel/>
      <Cartelera/>
    </>
  )
}

export default Principal
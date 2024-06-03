import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSeatSelection, clearSeatSelection } from "../../redux/slices/auth/seatSlices.js";
import useFetchPelicula from '../../Hooks/useFetchPelicula';
import { Link } from 'react-router-dom'; // Importa Link
import { useNavigate } from 'react-router-dom';
import './Reserva.css';
import cinePlusApi from '../../api/cinePlusApi.js';

function Reserva() {
  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedSeats } = useSelector(state => state.seats);
  useEffect(() => {
    dispatch(clearSeatSelection());
  },[]);
  const { email } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ message: "" });
  const [funcionInfo, setFuncionInfo] = useState({ id: "", idPelicula: "", hora: "", dia: "", mes: "", año: "", dimension: "", doblaje: "" });
  const [peliculaInfo, setPeliculaInfo] = useState({ id: "", title: "Buscando...", vote_average: 0, overview: "Cargando..." });
  const [seats, setSeats] = useState([]);
  const idFuncion = queryParams.get('id');
  const [precioSillas, setPrecioSillas] = useState(0);
  useEffect(() => {
    obtenerSillas().then(seats => { setSeats(seats) });
  }, []);

  useEffect(() => {
    updateSelectedCount();
  }, [selectedSeats]);

  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        let data = await obtenerDatosFuncion();
        setFuncionInfo(data[0]);
        setPrecioSillas(data[1]);
      } catch (error) {
        console.error('Error al obtener la función:');
      }
    };
    fetchPelicula();
  }, []);

  useEffect(() => {
    if (funcionInfo.idPelicula) {
      useFetchPelicula(funcionInfo.idPelicula).then((data) => { setPeliculaInfo(data) });
    }
  }, [funcionInfo]);

  function updateSelectedCount() {
    const selectedSeatsCount = selectedSeats.length;
    const totalPrice = precioSillas * selectedSeatsCount;

    document.getElementById('count').innerText = selectedSeatsCount;
    document.getElementById('total').innerText = totalPrice;
  }

  function handleSeatClick(seatId) {
    dispatch(toggleSeatSelection(seatId));
  }

  const obtenerDatosFuncion = async () => {
    try {
      const response = await cinePlusApi.get('/obtenerFuncionPorId/' + idFuncion);
      const idSilla = response.data.sillas[0]
      console.log(idSilla)
      const response2 = await cinePlusApi.get('/obtenerSillaPorId/' + idSilla);
      return [response.data,response2.data.precio];
    } catch (error) {
      console.log(error.message);
    }
  };

  const obtenerSillas = async () => {
    let sillasPorFetchear = [];
    let sillasFetcheadas = [];
    try {
      const response = await cinePlusApi.get('/obtenerFuncionPorId/' + idFuncion);
      sillasPorFetchear = response.data.sillas.map(silla => {
        return cinePlusApi.get('/obtenerSillaPorId/' + silla);
      });
      const responses = await Promise.all(sillasPorFetchear);
      responses.forEach(response => {
        sillasFetcheadas.push(response.data);
      });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setError({ message: 'Error al obtener las sillas de la película' });
    }
    return sillasFetcheadas;
  };

  const agregarSillasAOrden = async () => {
    try {
      const ordenResponse = await cinePlusApi.get(`/obtenerOrdenDeUsuario/${email}`);
      const ordenId = ordenResponse.data._id;

      const agregarSillaPromises = selectedSeats.map(seatId =>
        cinePlusApi.put('/agregarSillaAOrden', { ordenId, sillaId: seatId })
      );

      await Promise.all(agregarSillaPromises);

      // Actualizar estado de las sillas a false
      await cinePlusApi.put('/actualizarEstadoSilla', { sillaIds: selectedSeats });

      return true;
    } catch (error) {
      console.error('Error al agregar sillas a la orden:', error);
      setError({ message: 'Error al agregar sillas a la orden' });
      return false;
    }
  };

  const handleAgregarSillasClick = async (event) => {
    const success = await agregarSillasAOrden();

    if (!success) {
      event.preventDefault();
    }
    navigate('/Perfil/Orden');
  };

  return (
    <>
      <div className="reservation-container">
        <div className="seats-container">
          <div className='salaContainer'>
            <div className="sala">
              <div className="screen"></div>
              <div className="espacio"></div>
              {error.message ? <p className="messageSillas">{error.message}</p> : loading ? <p className="messageSillas">Cargando Asientos...</p> :
                <>
                  <div className="espaciov1"></div>
                  <div className="espaciov2"></div>
                  {seats.map((seat, key) => (
                    <div
                      className={`seat ${seat.estado ? 'occupied' : selectedSeats.includes(seat._id) ? 'selected' : ''}`}
                      key={key}
                      onClick={() => {
                        if (!seat.estado) handleSeatClick(seat._id);
                      }}
                    ></div>
                  ))}
                </>
              }
            </div>
          </div>
        </div>

        <div className="info-container">
          <div className="info-models">
            <div className="seatmodel">
              <p>Disponible:</p>
              <div className="seat model free"></div>
            </div>
            <div className="seatmodel">
              <p>No Disponible:</p><div className="seat model occupied"></div>
            </div>
            <div className="seatmodel">
              <p>Seleccionado:</p><div className="seat model selected"></div>
            </div>
          </div>
          <p><strong>Pelicula: </strong> {peliculaInfo ? peliculaInfo.title : ""} </p>
          <p><strong>Fecha:</strong> {funcionInfo.dia}/{funcionInfo.mes}/{funcionInfo.año}</p>
          <p><strong> Hora:</strong> {funcionInfo.hora}</p>
          <p><strong>Cantidad de Asientos:</strong> {seats.length}</p>
          <p><strong>Precio por asiento:</strong>  ${precioSillas}</p>
          <p className="text">
            <strong>Cantidad: </strong> <span id="count">0</span> <strong>Precio: </strong>$<span id="total">0</span>
          </p>
          {/* Utiliza Link para redirigir a la página de orden */}
          <button className="add-to-order-btn" onClick={handleAgregarSillasClick}>Agregar a Orden</button>
        </div>
      </div>
      <style>{
        `body {
          background-color: #021438;  
        }`
      }</style>
    </>
  );
}

export default Reserva;

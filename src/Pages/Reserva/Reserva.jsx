import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSeats, toggleSeatSelection, updateSeats } from "../../redux/slices/auth/seatSlices.js";
import useFetchPelicula from '../../Hooks/useFetchPelicula';
import { Link } from 'react-router-dom'; // Importa Link
import './Reserva.css';
import cinePlusApi from '../../api/cinePlusApi.js';

function Reserva() {
  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  const { selectedSeats, seats } = useSelector(state => state.seats);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ message: "" });
  const [funcionInfo, setFuncionInfo] = useState({ id: "", idPelicula: "", hora: "", dia: "", mes: "", año: "", dimension: "", doblaje: "" });
  const [peliculaInfo, setPeliculaInfo] = useState({ id: "", title: "Buscando...", vote_average: 0 });
  const idFuncion = queryParams.get('id'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seats = await obtenerSillas();
        dispatch(setSeats(seats));
        const dataFuncion = await obtenerDatosFuncion();
        setFuncionInfo(dataFuncion);
        if (dataFuncion.idPelicula) {
          const peliculaData = await useFetchPelicula(dataFuncion.idPelicula);
          setPeliculaInfo(peliculaData);
        }
        setLoading(false);
      } catch (error) {
        setError({ message: 'Error al cargar los datos' });
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    updateSelectedCount();
  }, [selectedSeats, peliculaInfo.vote_average]);

  function updateSelectedCount() {
    const selectedSeatsCount = selectedSeats.length;
    const totalPrice = selectedSeatsCount * peliculaInfo.vote_average * 3000;

    document.getElementById('count').innerText = selectedSeatsCount;
    document.getElementById('total').innerText = totalPrice;
  }

  function handleSeatClick(seatId) {
    dispatch(toggleSeatSelection(seatId));
  }

  const obtenerDatosFuncion = async () => {
    try {
      const response = await cinePlusApi.get('/obtenerFuncionPorId/' + idFuncion);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la función:', error.message);
      throw error;
    }
  };

  const obtenerSillas = async () => {
    try {
      const response = await cinePlusApi.get('/obtenerFuncionPorId/' + idFuncion);
      const sillasPorFetchear = response.data.sillas.map(silla => cinePlusApi.get('/obtenerSillaPorId/' + silla));
      const responses = await Promise.all(sillasPorFetchear);
      return responses.map(response => response.data);
    } catch (error) {
      console.error('Error al obtener las sillas:', error.message);
      throw error;
    }
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
                  {seats.map((seat) => (
                    <div
                      className={`seat ${seat.estado ? 'occupied' : 'free'}`}
                      key={seat.id}
                      onClick={() => handleSeatClick(seat.id)}
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
          <p><strong>Precio por asiento:</strong>  ${peliculaInfo.vote_average * 3000}</p>
          <p className="text">
            <strong>Cantidad: </strong> <span id="count">0</span> <strong>Precio: </strong>$<span id="total">0</span>
          </p>
          {/* Utiliza Link para redirigir a la página de orden */}
          <Link to="/Perfil/Orden" className="add-to-order-btn">Agregar a Orden</Link>
        </div>
      </div>
      <style>
        {`body {
          background-color: #021438;  
        }`}
      </style>
    </>
  );
}

export default Reserva;
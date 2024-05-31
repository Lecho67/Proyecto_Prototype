import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setSeats, toggleSeatSelection } from "../../redux/slices/auth/seatSlices.js";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Reserva.css';
import { useMovieContext } from '../../context/movieContext';

function Reserva() {
  const dispatch = useDispatch();
  const { selectedSeats, ticketPrice, seats } = useSelector(state => state.seats);
  const { setEntryTime } = useMovieContext();
  const [movieDetails, setMovieDetails] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get('movieId');
  const dimension = queryParams.get('dimension');
  const doblaje = queryParams.get('doblaje');
  const startTime = queryParams.get('entryTime');

  useEffect(() => {
    const initialSeats = generateSeats();
    dispatch(setSeats(initialSeats));
  }, [dispatch]);

  useEffect(() => {
    updateSelectedCount();
  }, [selectedSeats]);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(movieId);
    }
  }, [movieId]);

  useEffect(() => {
    if (startTime && movieDetails) {
      calculateEndTime();
    }
  }, [startTime, movieDetails]);

  function updateSelectedCount() {
    const selectedSeatsCount = selectedSeats.length;
    const totalPrice = selectedSeatsCount * ticketPrice;

    document.getElementById('count').innerText = selectedSeatsCount;
    document.getElementById('total').innerText = totalPrice;
  }

  function handleSeatClick(seatId) {
    dispatch(toggleSeatSelection(seatId));
  }

  function generateSeats() {
    const seats = [];
    let seatId = 0;
    for (let asientos = 1; asientos <= 128; asientos++) {
      const state = Math.random() < 0.3 ? 'occupied' : 'free';
      seats.push({ id: seatId++, state });
    }

    return seats;
  }

  async function fetchMovieDetails(id) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: '3b24534de9f3e0c2935e3edd6446ad0c',
          language: 'es',
        },
      });
      setMovieDetails(response.data);
    } catch (error) {
      console.error('Error al obtener los detalles de la película:', error);
    }
  }

  function calculateEndTime() {
    if (movieDetails.runtime && startTime) {
      const [hours, minutes] = startTime.split(':').map(Number);
      const entryDate = new Date();
      entryDate.setHours(hours);
      entryDate.setMinutes(minutes);
      entryDate.setSeconds(0);

      const endDate = new Date(entryDate.getTime() + movieDetails.runtime * 60000);
      setEndTime(endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }

  return (
    <>
      <div className="reservation-container">
      <div className="seats-container">
        <div className='salaContainer'>
          <div className="sala">
            <div className="screen"></div>
            <div className="espacio"></div>
            <div className="espaciov1"></div>
            <div className="espaciov2"></div>
            {seats.map(seat => (
              <div
                className={`seat ${seat.state? "free" : "occupied"}`}
                key={seat.id}
                onClick={() => handleSeatClick(seat.id)}
              ></div>
            ))}
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
        <p><strong>Pelicula:</strong> The Room </p>
        <p><strong>Fecha:</strong> May 10, 2024 <strong> Hora:</strong> 18:00</p>
        <p><strong>Cantidad de Asientos:</strong> 48</p>
        <p><strong>Precio por asiento:</strong> ${ticketPrice} </p>
        <p className="text">
          <strong>Cantidad: </strong> <span id="count">0</span> <strong>Precio: </strong>$<span id="total">0</span>
        </p>
        <Link to="/Perfil/Orden" className="add-to-order-btn">Agregar a Orden</Link>
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

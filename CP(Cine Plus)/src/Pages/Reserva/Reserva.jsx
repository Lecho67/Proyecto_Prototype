// src/components/Reserva/Reserva.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSeats, toggleSeatSelection, updateSeats } from "../../redux/slices/auth/seatSlices.js";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Reserva.css';
import { useMovieContext } from '../../context/movieContext';

function Reserva() {
  const dispatch = useDispatch();
  const { selectedSeats, ticketPrice, seats } = useSelector(state => state.seats);
  const { movieId, entryTime, setEntryTime } = useMovieContext();
  const [movieDetails, setMovieDetails] = useState(null);
  const [endTime, setEndTime] = useState(null);

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
    if (!entryTime) {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setEntryTime(formattedTime);
    }
  }, [setEntryTime, entryTime]);

  useEffect(() => {
    if (entryTime && movieDetails) {
      calculateEndTime();
    }
  }, [entryTime, movieDetails]);

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
    for (let row = 1; row <= 6; row++) {
      for (let column = 1; column <= 8; column++) {
        const state = Math.random() < 0.3 ? 'occupied' : 'free';
        seats.push({ id: seatId++, state });
      }
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
    if (movieDetails.runtime && entryTime) {
      const [hours, minutes] = entryTime.split(':').map(Number);
      const entryDate = new Date();
      entryDate.setHours(hours);
      entryDate.setMinutes(minutes);
      entryDate.setSeconds(0);

      const endDate = new Date(entryDate.getTime() + movieDetails.runtime * 60000);
      setEndTime(endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }

  return (
    <div className="reservation-container">
      <div className="seats-container">
        <div className="container">
          <div className="screen"></div>
          {Array.from({ length: 6 }, (_, row) => (
            <div className="row" key={row}>
              {seats.slice(row * 8, (row + 1) * 8).map(seat => (
                <div
                  className={`seat ${seat.state}`}
                  key={seat.id}
                  onClick={() => handleSeatClick(seat.id)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="info-container">
        {movieDetails && (
          <>
            <p><strong>Pelicula:</strong> {movieDetails.title}</p>
            <p><strong>Fecha de lanzamiento:</strong> {new Date(movieDetails.release_date).toLocaleDateString()}</p>
            <p><strong>Duración:</strong> {movieDetails.runtime} minutos</p>
          </>
        )}
        <p><strong>Hora de Ingreso:</strong> {entryTime}</p>
        <p><strong>Hora de Finalización:</strong> {endTime}</p>
        <p><strong>Cantidad de Asientos:</strong> 48</p>
        <p><strong>Sala:</strong> 1</p>
        <p><strong>Precio del boleto:</strong> ${ticketPrice}</p>
        <div className="seat-types">
          <p><strong>Tipos de Asientos:</strong></p>
          <ul className="showcase">
            <li>
              <div className="seat occupied"></div>
              <small>Ocupada</small>
            </li>
            <li>
              <div className="seat free"></div>
              <small>Libre</small>
            </li>
            <li>
              <div className="seat selected"></div>
              <small>Seleccionada</small>
            </li>
          </ul>
        </div>
        <p className="text">
          <strong>Cantidad: </strong> <span id="count">0</span> <strong>Precio: </strong>$<span id="total">0</span>
        </p>
        <Link to="/Perfil/Orden" className="add-to-order-btn">Agregar a Orden</Link>
      </div>
    </div>
  );
}

export default Reserva;

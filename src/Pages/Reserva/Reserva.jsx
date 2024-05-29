import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSeats, toggleSeatSelection, updateSeats } from "../../redux/slices/auth/seatSlices.js";
import { Link } from 'react-router-dom'; // Importa Link
import './Reserva.css';

function Reserva() {
  const dispatch = useDispatch();
  const { selectedSeats, ticketPrice, seats } = useSelector(state => state.seats);

  useEffect(() => {
    const initialSeats = generateSeats();
    dispatch(setSeats(initialSeats));
  }, [dispatch]);

  useEffect(() => {
    updateSelectedCount();
  }, [selectedSeats]);

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
                className={`seat ${seat.state}`}
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
        {/* Utiliza Link para redirigir a la página de orden */}
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

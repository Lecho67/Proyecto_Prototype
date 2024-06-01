import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSeats, toggleSeatSelection, updateSeats } from "../../redux/slices/auth/seatSlices.js";
import { Link } from 'react-router-dom'; // Importa Link
import './Reserva.css';
import cinePlusApi from '../../api/cinePlusApi.js';

function Reserva() {
  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  const { selectedSeats, ticketPrice, seats } = useSelector(state => state.seats);

  useEffect(() => {
    const initialSeats = obtenerSillas().then(initialSeats => {console.log(initialSeats);dispatch(setSeats(initialSeats))});
    
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

  const obtenerSillas = async() => {
    let seats = [];
    try {
      console.log(seats);
      const response = await cinePlusApi.get('/obtenerFuncionPorId/' + queryParams.get('id'));
      console.log(response.data);
      seats = response.data.sillas; 
    } catch (error) {
      console.log(error.message);
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
            { seats.map(seat => (
              <div
                className={`seat ${seat.estado}`}
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

import React, { useState, useEffect } from 'react';
import "./Reserva.css"

function Reserva() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(25950);
  const [seats, setSeats] = useState(generateSeats());

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
    const updatedSeats = seats.map(seat => {
      if (seat.id === seatId) {
        return { ...seat, state: seat.state === 'selected' ? 'free' : seat.state === 'occupied' ? 'occupied' : 'selected' };
      }
      return seat;
    });

    setSeats(updatedSeats);
    const updatedSelectedSeats = updatedSeats.filter(seat => seat.state === 'selected').map(seat => seat.id);
    setSelectedSeats(updatedSelectedSeats);
  }

  function generateSeats() {
    const seats = [];
    let seatId = 0;
    for (let row = 1; row <= 6; row++) {
      for (let column = 1; column <= 8; column++) {
        const state = Math.random() < 0.3 ? 'occupied' : 'free';
        seats.push({ id: seatId++, state });
        console.log(seatId);
      }
    }
    return seats;
  }

  return (
    <div className="reservation-container">
      <div className="seats-container">
        <div className="container">
          <div className="screen"></div>
          {/* Render seats dynamically */}
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
        <p><strong>Pelicula:</strong> The Room </p>
        <p><strong>Fecha:</strong> May 10, 2024 <strong> Hora:</strong> 18:00</p>
        <p><strong>Cantidad de Asientos:</strong> 48</p>
        <p><strong>Sala:</strong> 1</p>
        <p><strong>Precio del boleto:</strong> ${ticketPrice} </p>
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
        <button className="add-to-order-btn">Agregar a Orden</button>
      </div>
    </div>
  );
}

export default Reserva;

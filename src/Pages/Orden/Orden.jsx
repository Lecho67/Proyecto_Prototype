import React from "react";
import { useSelector } from 'react-redux';
import "./Orden.css";

export const Orden = ({ allProducts, total }) => {
  const { selectedSeats, seats, ticketPrice } = useSelector(state => state.seats);
  const selectedSeatDetails = seats.filter(seat => selectedSeats.includes(seat.id));
  const seatTotal = selectedSeats.length * ticketPrice;
  const combinedTotal = total + seatTotal;

  return (
    <div className="order-container">
      <h1>Carrito de Compras</h1>

      {selectedSeats.length > 0 && (
        <>
          <h2>Asientos Seleccionados</h2>
          {selectedSeatDetails.map(seat => (
            <div className="order-item" key={seat.id}>
              <div className="order-item-info">
                <h2>Asiento {seat.id}</h2>
                <p>Precio: ${ticketPrice}</p>
              </div>
            </div>
          ))}
        </>
      )}

      {allProducts.length > 0 && (
        <>
          <h2>Productos</h2>
          {allProducts.map(product => (
            <div className="order-item" key={product.id}>
              <img src={product.img} alt={product.nameProduct} />
              <div className="order-item-info">
                <h2>{product.nameProduct}</h2>
                <p>Precio: ${product.price}</p>
                <p>Cantidad: {product.quantity}</p>
                <p>Total: ${product.price * product.quantity}</p>
              </div>
            </div>
          ))}
        </>
      )}

      {selectedSeats.length === 0 && allProducts.length === 0 && (
        <p>No hay productos en el carrito</p>
      )}

      <div className="order-total">
        <h2>Total a pagar: ${combinedTotal}</h2>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import cinePlusApi from "../../api/cinePlusApi";
import "./Orden.css";

export const Orden = () => {
  const { email } = useSelector(state => state.auth);
  const { selectedSeats, seats, ticketPrice } = useSelector(state => state.seats);
  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const fetchOrderProducts = async () => {
      try {
        const response = await cinePlusApi.get(`/obtenerOrdenDeUsuario/${email}`);
        const { productos } = response.data;

        // Fetch detailed product data
        const productDetails = await Promise.all(productos.map(async productId => {
          try {
            const productResponse = await cinePlusApi.get(`/productos/${productId}`);
            return { ...productResponse.data, productId };  // Include productId in the product data
          } catch (error) {
            console.error(`Error fetching product ${productId}:`, error);
            return null;
          }
        }));

        const validProducts = productDetails.filter(product => product !== null);

        // Combine similar products
        const combinedProducts = validProducts.reduce((acc, product) => {
          const existingProduct = acc.find(item => item._id === product._id);
          if (existingProduct) {
            existingProduct.quantity += 1;
            existingProduct.totalPrice += parseFloat(product.precio); // Ensure the price is treated as a number
          } else {
            acc.push({ ...product, quantity: 1, totalPrice: parseFloat(product.precio) });
          }
          return acc;
        }, []);

        setOrderProducts(combinedProducts);
      } catch (error) {
        console.error('Error fetching order products:', error);
        setError('Failed to fetch order products.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderProducts();
  }, [email]);

  useEffect(() => {
    const selectedSeatDetails = seats.filter(seat => selectedSeats.includes(seat.id));
    const seatTotal = selectedSeats.length * parseFloat(ticketPrice || 0);
    console.log("Seat total:", seatTotal);
    
    const productTotal = orderProducts.reduce((sum, product) => {
      const totalPrice = parseFloat(product.totalPrice || 0);
      console.log("Adding product price:", totalPrice);
      return sum + totalPrice;
    }, 0);
    console.log("Product total:", productTotal);

    const total = seatTotal + productTotal;
    console.log("Total payment:", total);

    setTotalPayment(total);
  }, [selectedSeats, orderProducts, seats, ticketPrice]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p>{error}</p>;

  const selectedSeatDetails = seats.filter(seat => selectedSeats.includes(seat.id));

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
                <p>Precio: ${parseFloat(ticketPrice).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </>
      )}

      {orderProducts.length > 0 && (
        <>
          <h2>Productos</h2>
          {orderProducts.map(product => (
            <div className="order-item" key={product._id}>
              <img src={product.img} alt={product.nameProduct} />
              <div className="order-item-info">
                <h2>{product.nameProduct}</h2>
                <p>Precio: ${parseFloat(product.precio).toFixed(2)}</p>
                <p>Cantidad: {product.quantity}</p>
                <p>Total: ${parseFloat(product.totalPrice).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </>
      )}

      {selectedSeats.length === 0 && orderProducts.length === 0 && (
        <p>No hay productos en el carrito</p>
      )}

      {(selectedSeats.length > 0 || orderProducts.length > 0) && (
        <div className="order-total">
          <h2>Total a pagar: ${totalPayment.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

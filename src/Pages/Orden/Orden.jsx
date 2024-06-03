import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import cinePlusApi from "../../api/cinePlusApi";
import useFetchPelicula from "../../Hooks/useFetchPelicula";
import "./Orden.css";

export const Orden = () => {
  const { email } = useSelector(state => state.auth);
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderSeats, setOrderSeats] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [error, setError] = useState(null);
  const [totalPayment, setTotalPayment] = useState(0);


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
      console.error('Error Obteniendo Productos: ', error);
      setError('Error Obteniendo Productos');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderSeats = async () => {
    try {
      const response = await cinePlusApi.get(`/informacionSillasReservadas/${email}`);
      const { sillas } = response.data;
      let sillasAgrupadas = {};
      sillas.forEach(silla => {
        useFetchPelicula(silla.funcion.idPelicula).then((data) => {
          const sillaConDatosDePelicula = { ...silla, titulo: data.title , poster: data.poster_path};
          sillasAgrupadas[silla.funcion._id] = [...sillasAgrupadas[silla.funcion._id] || [], sillaConDatosDePelicula];
        });
      });
      setOrderSeats(sillasAgrupadas);
      console.log(sillasAgrupadas);
    } catch (error) {
      console.error('Error Obteniendo Asientos: ', error);
      setError('Error Obteniendo Asientos');
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    fetchOrderProducts();
    fetchOrderSeats();
  }, [email]);

  useEffect(() => {
    const calculateTotalPayment = () => {
      const totalFromProducts = orderProducts.reduce((acc, product) => acc + product.totalPrice, 0);
      let totalFromSeats = 0;
      Object.keys(orderSeats).map((funcionid, key) => (
        totalFromSeats += orderSeats[funcionid].reduce((acc, seat) => acc + seat.precio, 0)
      ));
      setTotalPayment(totalFromProducts + totalFromSeats);
    };
    calculateTotalPayment();
  }, [orderProducts]);


  if (loading || loading2) return <div className="loadingContainer"><p className="loadingMiOrden">Cargando Datos De La Orden...</p></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="order-container">
      <h1>Carrito de Compras</h1>
      {Object.keys(orderSeats).length > 0 &&(
        <>
          <h2>Asientos Seleccionados</h2>
          {Object.keys(orderSeats).map((funcionid, key) => (
            <div className="order-item" key={key}>
              <img src={`https://image.tmdb.org/t/p/w300/${orderSeats[funcionid][0]?.poster}`} alt={orderSeats[funcionid][0]?.titulo} />
              <div className="order-item-info">
              
                <h3>{orderSeats[funcionid][0]?.titulo}</h3>
                <p>Hora: {orderSeats[funcionid][0]?.funcion.hora}</p>
                <p>Fecha: {orderSeats[funcionid][0]?.funcion.dia}/{orderSeats[funcionid][0]?.funcion.mes}/{orderSeats[funcionid][0]?.funcion.año}</p>
                <p>Cantidad De Asientos: {orderSeats[funcionid].length}</p>
                <p>Total: ${orderSeats[funcionid].reduce((acc, seat) => acc + seat.precio, 0)}</p>
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

      {0 === 0 && orderProducts.length === 0 && (
        <p>No hay productos en el carrito</p>
      )}

      {(0 > 0 || orderProducts.length > 0) && (
        <div className="order-total">
          <h2>Total a pagar: ${totalPayment.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

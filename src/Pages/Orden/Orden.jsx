import React, { useEffect, useState} from "react";
import { useSelector } from 'react-redux';
import cinePlusApi from "../../api/cinePlusApi";
import useFetchPelicula from "../../Hooks/useFetchPelicula";
import "./Orden.css";
import equis from "../../assets/equis.png";

export const Orden = () => {
  const { email } = useSelector(state => state.auth);
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderSeats, setOrderSeats] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(false);
  const [error, setError] = useState(null);
  const [totalPayment, setTotalPayment] = useState(0);


  const fetchOrderProducts = async () => {
    try {
      setLoading3(true);
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
      setLoading3(false);
      setLoading(false);
    }
  };
  const handleDeleteSeat= async (info) => {
    try {
      const response = await cinePlusApi.put(`/quitarSillasDeOrden`, info);
      console.log(response);
      if (response.status === 200) {
        fetchOrderSeats();
      }
    } catch (error) {
      console.error('Error eliminando las sillas: ', error);
    }
  };
  const handleDeleteProduct= async (info) => {
    try {
      const response = await cinePlusApi.put(`/quitarProductosPorId`, info);
      console.log(response);
      if (response.status === 200) {
        fetchOrderProducts();
      }
    } catch (error) {
      console.error('Error eliminando los productos: ', error);
    }
  };

  const fetchOrderSeats = async () => {
    try {
      setLoading3(true);
      const response = await cinePlusApi.get(`/informacionSillasReservadas/${email}`);
      const { sillas } = response.data;

      const sillasConDatos = await Promise.all(sillas.map(async silla => {
        try {
          const data = await useFetchPelicula(silla.funcion.idPelicula);
          return { ...silla, titulo: data.title, poster: data.poster_path };
        } catch (error) {
          console.error(`Error fetching pelicula data for silla ${silla._id}:`, error);
          return null;
        }
      }));

      const validSillasConDatos = sillasConDatos.filter(silla => silla !== null);

      const sillasAgrupadas = validSillasConDatos.reduce((acc, silla) => {
        acc[silla.funcion._id] = [...(acc[silla.funcion._id] || []), silla];
        return acc;
      }, {});

      setOrderSeats(sillasAgrupadas);
    } catch (error) {
      console.error('Error Obteniendo Asientos: ', error);
      setError('Error Obteniendo Asientos');
    } finally {
      setLoading2(false);
      setLoading3(false);
    }
  };

  useEffect(() => {
    fetchOrderProducts();
    fetchOrderSeats();
    console.log(orderSeats);
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
  }, [orderProducts, orderSeats]);


  if (loading || loading2) return <><div className="loadingContainer"><p className="loadingMiOrden">Cargando Datos De La Orden...</p></div><style>{"body {cursor: wait}"}</style></>;
  if (error) return <p>{error}</p>;

  return (
    <div className="order-container">
      <h1>Carrito de Compras</h1>
      {Object.keys(orderSeats).length > 0 &&(
        <>
          <h2>Asientos Seleccionados</h2>
          {Object.keys(orderSeats).map((funcionid, key) => (
            <div className="order-item" key={key}>
              <div className="order-info-container">
              <img className="order-item-image" src={`https://image.tmdb.org/t/p/w300/${orderSeats[funcionid][0]?.poster}`} alt={orderSeats[funcionid][0]?.titulo} />
                <div className="order-item-info">
                  <h3>{orderSeats[funcionid][0]?.titulo}</h3>
                  <p>Hora: {orderSeats[funcionid][0]?.funcion.hora}</p>
                  <p>Fecha: {orderSeats[funcionid][0]?.funcion.dia}/{orderSeats[funcionid][0]?.funcion.mes}/{orderSeats[funcionid][0]?.funcion.año}</p>
                  <p>Cantidad De Asientos: {orderSeats[funcionid].length}</p>
                  <p>Total: ${orderSeats[funcionid].reduce((acc, seat) => acc + seat.precio, 0)}</p>
                </div>
              </div>
              <div className="delete-button" onClick={() => handleDeleteSeat({sillasId: orderSeats[funcionid].map(silla => silla._id), email})}>
                  <img className="delete-img" src={equis} alt="equis"/>
              </div>
            </div>
          ))}
        </>
      )} 

      {orderProducts.length > 0 && (
        <>
          <h2>Productos</h2>
          {orderProducts.map((product, key) => (
            <div className="order-item" key={key}>
            <div className="order-info-container">
            <img className="order-item-image"  src={product.img} alt={product.name} />
              <div className="order-item-info">
                <h3>{product.nameProduct}</h3>
                
                <p>Precio: ${parseFloat(product.precio).toFixed(2)}</p>
                <p>Cantidad: {product.quantity}</p>
                <p>Total: ${parseFloat(product.totalPrice).toFixed(2)}</p>
              </div>
            </div>
            <div className="delete-button" onClick={() => {handleDeleteProduct({productoId: product._id, email: email})}}>
                <img className="delete-img" src={equis} alt="equis"/>
            </div>
          </div>
          ))}
        </>
      )}

      {Object.keys(orderSeats).length === 0 && orderProducts.length === 0 && (
        <p>No hay productos en el carrito</p>
      )}

      {(Object.keys(orderSeats).length > 0 || orderProducts.length > 0) && (
        <div className="order-total">
          <h2>Total a pagar: ${totalPayment.toFixed(2)}</h2>
        </div>
      )}
      <style>{loading3 && "body {cursor: wait}"}</style>
    </div>
  );
};

// src/context/MovieContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movieId, setMovieId] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [entryTime, setEntryTime] = useState(null); // Nuevo estado para la hora de ingreso

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setAllProducts(storedCart.allProducts);
      setTotal(storedCart.total);
      setCountProducts(storedCart.countProducts);
      setEntryTime(storedCart.entryTime); // Recuperar la hora de ingreso almacenada
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ allProducts, total, countProducts, entryTime }));
  }, [allProducts, total, countProducts, entryTime]);

  return (
    <MovieContext.Provider value={{ movieId, setMovieId, allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts, entryTime, setEntryTime }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);

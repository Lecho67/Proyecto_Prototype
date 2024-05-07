import React, { useState, createContext, useContext } from "react";

// Creamos un contexto para los productos
const ProductContext = createContext();

// Creamos un componente proveedor que envuelve toda la aplicación
const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        setAllProducts,
        total,
        setTotal,
        countProducts,
        setCountProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
const useProductContext = () => useContext(ProductContext);

export { ProductProvider, useProductContext };

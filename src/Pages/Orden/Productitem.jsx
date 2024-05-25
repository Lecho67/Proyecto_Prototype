import React from 'react';
import styles from './styles_comida/Productitem.module.css';

function Productitem({ data, addToCart }) {
  return (
    <div className={styles.productContainer}> {/* Contenedor externo */}
      <div className={styles.container_product}>
        <h2>{data.name}</h2>
        <p>Precio: {data.price}</p>
        <button className={styles.btnProduct} onClick={() => addToCart(data.id)}>Agregar al Carrito</button>
      </div>
    </div>
  );
}

export default Productitem;

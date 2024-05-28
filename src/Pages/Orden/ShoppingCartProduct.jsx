import React from 'react'
import styles from './styles_comida/ShoppingCartProduct.module.css'
function ShoppingCartProduct({ data, deleteFromCart }) {
  return (
    <div className={styles.container_productCart}>
        <h2>{data.name}</h2>
        <p>Price: {data.price}</p>
        <button className={styles.btnProductCart} onClick={() => deleteFromCart(data.id)}>Eloiminar</button>
    </div>
  )
}

export default ShoppingCartProduct

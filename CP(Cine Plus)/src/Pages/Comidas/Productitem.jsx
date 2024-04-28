import React from 'react'
import styles from './styles_comida/Productitem.module.css'
function Productitem({data,addToCart}) {
  return (
    <div className={styles.container_product}>
      <h2>{data.name}</h2>
      <p>Price: {data.price}</p>
      <button className={styles.btnProduct} onClick={() => addToCart(data.id)}>Add to Cart</button>
    </div>
  )
}

export default Productitem
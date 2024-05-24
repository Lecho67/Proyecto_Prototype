import React from 'react';
import styles from './Error404.module.css';
import { Link } from 'react-router-dom';   
const Error404 = () => {
  return (
    <div className={styles.wrapper}>
    <div className={styles.container}>
      <h1 className={styles.title}>Error 404</h1>
      <p className={styles.text}>Lo sentimos, la página que buscas no se encuentra.</p>
      <p className={styles.text}><Link to={"/"} className={styles.link}>Volver a la página de inicio</Link></p>
    </div>
    </div>
  );
}

export default Error404;



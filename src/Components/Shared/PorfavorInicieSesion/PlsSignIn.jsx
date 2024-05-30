import styles from "./plsSignin.module.css";
import logo from "../../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const PlsSignIn = ({mensaje = "Por favor inicia sesion para añadir elementos al carrito"}) => {
    const lastPath = localStorage.getItem('lastPath');
    const navigate = useNavigate();
    const onClickLogin = () => {
        navigate("/login");
    };
    return (
        <div className={styles.container}>
          <header className={styles.header}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </header>
          <div className={styles.content}>
            <div className={styles.topHalf}></div>
            <div className={styles.bottomHalf}></div>
            <div className={styles.centerContainer}>
              <p className={styles.message}>{mensaje}</p>
              <button className={styles.loginButton} onClick={() => onClickLogin()}>Iniciar sesión</button>
              <Link to={lastPath} className={styles.homeLink}>Volver a la página anterior</Link>
            </div>
          </div>
        </div>
      );
}
import "./BarraNavegacion.css"; // Importa el archivo de estilos CSS
import "../../Shared/CarritoCompras/Car.css";
import logo from "../../../assets/Logo.png";
import botonHamburguesa from "../../../assets/BotonHamburguesa.png";
import perfil from "../../../assets/Perfil.png";
import { useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { cerrarSesion } from "../../../redux/slices/auth/Thunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export const Navigation = ({
    allProducts,
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal,
}) => {
    const [active, setActive] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    const [menuPerfilVisible, setMenuPerfilVisible] = useState(false);
    const toggleMenuPerfil = () => {
        setMenuPerfilVisible(!menuPerfilVisible);
        setActive(false);
    };

    const onDeleteProduct = (product) => {
        const results = allProducts.filter((item) => item.id !== product.id);

        setTotal(total - product.price * product.quantity);
        setCountProducts(countProducts - product.quantity);
        setAllProducts(results);
    };

    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname,search} = useLocation();
    const lastPath = localStorage.setItem('lastPath', `${pathname}${search}`); 

    const handleLogout = () => {
        dispatch(cerrarSesion());
        navigate("/",{replace:true});
    }

    return (
        <>
            <div className="BarraNav">
                <nav className="BarraNav">
                    <div className="logoContainer">
                        <img className="logo" src={logo} alt=""></img>
                    </div>
                    <div className="linksContainer">
                        <Link to="/" className="nav-inicio">
                            Inicio
                        </Link>
                        <Link to="/Comidas" className="nav-comidas">
                            Comidas
                        </Link>
                        <Link to="/Estrenos" className="nav-estrenos">
                            Estrenos
                        </Link>
                        <div className="container-icon">
                            <div
                                className="container-cart-icon"
                                onClick={() => {
                                    setActive(!active)
                                    setMenuPerfilVisible(false)
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="icon-cart"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                </svg>
                                <div className="count-products">
                                    <span id="contador-productos">
                                        {countProducts}
                                    </span>
                                </div>
                            </div>

                            <div
                                className={`container-cart-products ${
                                    active ? "" : "hidden-cart"
                                }`}
                            >
                                {allProducts.length ? (
                                    <>
                                        <div className="row-product">
                                            {allProducts.map((product) => (
                                                <div
                                                    className="cart-product"
                                                    key={product.id}
                                                >
                                                    <div className="info-cart-product">
                                                        <span className="cantidad-producto-carrito">
                                                            {product.quantity}
                                                        </span>
                                                        <p className="titulo-producto-carrito">
                                                            {
                                                                product.nameProduct
                                                            }
                                                        </p>
                                                        <span className="precio-producto-carrito">
                                                            ${product.price}
                                                        </span>
                                                    </div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="icon-close"
                                                        onClick={() =>
                                                            onDeleteProduct(
                                                                product
                                                            )
                                                        }
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="cart-total">
                                            <h3>Total:</h3>
                                            <span className="total-pagar">
                                                ${total}
                                            </span>
                                        </div>

                                        <button
                                            className="btn-clear-all"
                                            onClick={onCleanCart}
                                        >
                                            Vaciar Carrito
                                        </button>
                                    </>
                                ) : (
                                    <p className="cart-empty">
                                        El carrito está vacío
                                    </p>
                                )}
                            </div>
                        </div>
						<div className="ProfileButtonContainer">
                        <button className="btnPerfil" onClick={toggleMenuPerfil}>
                            <img
                                src={perfil}
                                alt="Botón de perfil"
                                className="imgPerfil"
                            />
                        </button>
                    </div>
                    </div>
					
                    <div className="BurgerButtonContainer">
                        <button className="btnHamburguesa" onClick={toggleMenu}>
                            <img
                                src={botonHamburguesa}
                                alt="Botón de hamburguesa"
                                className="imgHamburgesa"
                            />
                        </button>
                    </div>
                </nav>
            </div>
            <div
                className={`${
                    menuVisible
                        ? "menuDesplegableVisible"
                        : "menuDesplegableInvisible"
                }`}
            >
                <a href="/">
                    <div className="itemMenuDesplegable">Inicio</div>
                </a>
                <a href="/Comidas">
                    <div className="itemMenuDesplegable">Comidas</div>
                </a>
                <a href="/Estrenos">
                    <div className="itemMenuDesplegable">Próximos Estrenos</div>
                </a>
                <a href="/Perfil">
                    <div className="itemMenuDesplegable">Mi Perfil</div>
                </a>
                <a href="/Perfil/Orden">
                    <div className="itemMenuDesplegable">Mi Orden</div>
                </a>
            </div>
            <div
                className={`${
                    menuPerfilVisible
                        ? "menuPerfilDesplegableVisible"
                        : "menuPerfilDesplegableInvisible"
                }`}
            >
                <Link to="/Login">
                    <div className="itemMenuPerfilDesplegable">Iniciar Sesión</div>
                </Link>
                <Link to="/Perfil">
                    <div className="itemMenuPerfilDesplegable">Mi Perfil</div>
                </Link>
                <Link to="/Perfil/Orden">
                    <div className="itemMenuPerfilDesplegable">Mi Orden</div>
                </Link>
                <a href="#">
                <div className="itemMenuPerfilDesplegable" onClick={()=>{
                    
                    handleLogout()

                }} >Cerrar Sesión</div>
                </a>
            </div>
        </>
    );
};

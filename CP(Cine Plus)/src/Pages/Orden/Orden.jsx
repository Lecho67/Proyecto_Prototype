import React from "react";
import "./Orden.css"; // 

export const Orden = ({ allProducts, total }) => {
    return (
        <div className="order-container">
            <h1>Carrito de Compras</h1>
            {allProducts.length === 0 ? (
                <p>No hay productos en el carrito</p>
            ) : (
                allProducts.map(product => (
                    <div className="order-item" key={product.id}>
                        <img src={product.img} alt={product.nameProduct} />
                        <div className="order-item-info">
                            <h2>{product.nameProduct}</h2>
                            <p>Precio: ${product.price}</p>
                            <p>Cantidad: {product.quantity}</p>
                            <p>Total: ${product.price * product.quantity}</p>
                        </div>
                    </div>
                ))
            )}
            <div className="order-total">
                <h2>Total a pagar: ${total}</h2>
            </div>
        </div>
    );
};
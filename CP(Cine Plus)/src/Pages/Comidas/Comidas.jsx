import { data } from "../../Helpers/data";
import React from 'react'
import { Navigation } from "../../Components/Shared/BarraNavegacion/BarraNavegacion";
import '../../Components/Shared/CarritoCompras/Car.css';

export const Comidas = ({
    allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
    const onAddProduct = product => {
		if (allProducts.find(item => item.id === product.id)) {
			const products = allProducts.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setTotal(total + product.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
		}

		setTotal(total + product.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, product]);
	};
	
	
  return (
    (
        <>
        <Navigation
		allProducts={allProducts}
		setAllProducts={setAllProducts}
		total={total}
		setTotal={setTotal}
		countProducts={countProducts}
		setCountProducts={setCountProducts}
		/>
		<div className='container-items'>
			{data.map(product => (
				<div className='item' key={product.id}>
					<figure>
						<img src={product.img} alt={product.nameProduct} />
					</figure>
					<div className='info-product'>
						<h2>{product.nameProduct}</h2>
						<p className='price'>${product.price}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</button>
					</div>
				</div>
			))}
		</div>
        </>
  )
)
};

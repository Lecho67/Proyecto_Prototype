
import "./App.css"
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Principal from "../Principal/Principal"
import Pelicula_info from "../Pelicula_info/Pelicula_info"
import Estrenos from "../Estrenos/Estrenos"
import { Orden } from "../Orden/Orden"
import { useState } from "react"
import { Comidas } from "../Comidas/Comidas"
import { Navigation } from "../../Components/Shared/BarraNavegacion/BarraNavegacion"

function App() {
	const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

	return (
		<div>
			<BrowserRouter>
				<Routes>	
					<Route index element={<>
						<Navigation
							allProducts={allProducts}
							setAllProducts={setAllProducts}
							total={total}
							setTotal={setTotal}
							countProducts={countProducts}
							setCountProducts={setCountProducts}
       					 />
						<Principal/>
						
					</>} />
					<Route path="/Comidas"  element={<>
						<Navigation
							allProducts={allProducts}
							setAllProducts={setAllProducts}
							total={total}
							setTotal={setTotal}
							countProducts={countProducts}
							setCountProducts={setCountProducts}
       					/>
						<Comidas
							allProducts={allProducts}
							setAllProducts={setAllProducts}
							total={total}
							setTotal={setTotal}
							countProducts={countProducts}
							setCountProducts={setCountProducts}  
          				/> 
					</>} />
					<Route path="/Pelicula" element={<>
						<Pelicula_info />
						<Navigation
							allProducts={allProducts}
							setAllProducts={setAllProducts}
							total={total}
							setTotal={setTotal}
							countProducts={countProducts}
							setCountProducts={setCountProducts}
       					 />
					</>} />
					<Route path="/Estrenos" element={<>
						<Navigation
							allProducts={allProducts}
							setAllProducts={setAllProducts}
							total={total}
							setTotal={setTotal}
							countProducts={countProducts}
							setCountProducts={setCountProducts}
       					 />
						<Estrenos/>
					
					</>}/>
					<Route path="/MiOrden" element={<>
						<Navigation
							allProducts={allProducts}
							setAllProducts={setAllProducts}
							total={total}
							setTotal={setTotal}
							countProducts={countProducts}
							setCountProducts={setCountProducts}
       					 />
					<Orden /></>} />

				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App


import "./App.css"
import {BrowserRouter, Routes, Route, Link } from "react-router-dom"
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
			<Navigation allProducts={allProducts}
							setAllProducts={setAllProducts}
							total={total}
							setTotal={setTotal}
							countProducts={countProducts}
							setCountProducts={setCountProducts}/>
			<BrowserRouter>
				<Routes>	
					<Route path='/' element={<Principal/>}/>
					<Route path="/Comidas"  element={<>
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
					</>} />
					<Route path="/Estrenos" element={<>
						<Estrenos/>
					
					</>}/>
					<Route path="/MiOrden" element={<>
					<Orden /></>} />

				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App

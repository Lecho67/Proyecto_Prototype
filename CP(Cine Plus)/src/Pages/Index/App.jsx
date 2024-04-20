
import "./App.css"
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Principal from "../Principal/Principal"
import Comidas from "../Comidas/Comidas"
import Pelicula_info from "../Pelicula_info/Pelicula_info"


function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>	
					<Route index element={<Principal />} />
					<Route path="/Comidas" element={<Comidas />} />
					<Route path="/Pelicula" element={<Pelicula_info />} />

				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App

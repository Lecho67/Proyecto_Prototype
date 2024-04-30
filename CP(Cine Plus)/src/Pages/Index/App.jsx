
import "./App.css"
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Principal from "../Principal/Principal"
import Pelicula_info from "../Pelicula_info/Pelicula_info"
import Estrenos from "../Estrenos/Estrenos"
import { Orden } from "../Orden/Orden"

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>	
					<Route index element={<Principal />} />
					
					<Route path="/Pelicula" element={<Pelicula_info />} />
					<Route path="/Estrenos" element={<Estrenos/>}/>
					<Route path="/MiOrden" element={<Orden />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App

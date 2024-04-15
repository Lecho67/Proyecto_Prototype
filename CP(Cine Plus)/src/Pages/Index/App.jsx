
import "./App.css"
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Principal from "../Principal/Principal"
import Comidas from "../Comidas/Comidas"



function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>	
					<Route index element={<Principal />} />
					<Route path="/Comidas" element={<Comidas />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App

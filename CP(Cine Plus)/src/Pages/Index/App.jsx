import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "../Principal/Principal";
import Pelicula_info from "../Pelicula_info/Pelicula_info";
import Estrenos from "../Estrenos/Estrenos";
import { Orden } from "../Orden/Orden";
import { useState } from "react";
import { Comidas } from "../Comidas/Comidas";
import { Navigation } from "../../Components/Shared/BarraNavegacion/BarraNavegacion";
import {Login} from "../Login/Login.jsx"
import {Registro} from "../Login/Registro.jsx"
import Error404 from "../../Components/Shared/NoEncontrado/Error404.jsx";
import { PrivateRoutes } from "./privateRoutes/PrivateRoutes.jsx";
function App() {
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <div>
                        <Navigation
                            allProducts={allProducts}
                            setAllProducts={setAllProducts}
                            total={total}
                            setTotal={setTotal}
                            countProducts={countProducts}
                            setCountProducts={setCountProducts}
                        />
                        <Principal />
                    </div>
                } />
                <Route path="/Comidas" element={
                    <div>
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
                    </div>
                } />
                <Route path="/Pelicula" element={
                    <div>
                        <Navigation
                            allProducts={allProducts}
                            setAllProducts={setAllProducts}
                            total={total}
                            setTotal={setTotal}
                            countProducts={countProducts}
                            setCountProducts={setCountProducts}
                        />
                        <Pelicula_info />
                    </div>
                } />
                <Route path="/Estrenos" element={
                    <div>
                        <Navigation
                            allProducts={allProducts}
                            setAllProducts={setAllProducts}
                            total={total}
                            setTotal={setTotal}
                            countProducts={countProducts}
                            setCountProducts={setCountProducts}
                        />
                        <Estrenos />
                    </div>
                } />


                <Route element={<PrivateRoutes />}>
                {/*aqui deben ir las rutas privadas*/}
                <Route path="/Perfil/Orden" element={
                    <div>
                        <Navigation
                            allProducts={allProducts}
                            setAllProducts={setAllProducts}
                            total={total}
                            setTotal={setTotal}
                            countProducts={countProducts}
                            setCountProducts={setCountProducts}
                        />
                        <Orden />
                    </div>
                } />

                    <Route path="/Perfil" element={
                    <div>
                        <Navigation
                            allProducts={allProducts}
                            setAllProducts={setAllProducts}
                            total={total}
                            setTotal={setTotal}
                            countProducts={countProducts}
                            setCountProducts={setCountProducts}
                        />
                    </div>
                } />
                </Route>

                
                <Route path="/Login" element={<Login />} />
                <Route path="/Registro" element={<Registro />} />

                
                    
                

                <Route path="/*" element={<Error404 />}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
